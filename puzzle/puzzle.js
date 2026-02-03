/* Puzzle Game Logic */

document.addEventListener('DOMContentLoaded', () => {
    const selectionScreen = document.getElementById('selection-screen');
    const gameScreen = document.getElementById('game-screen');
    const puzzleBoard = document.getElementById('puzzle-board');
    const refImg = document.getElementById('ref-img');
    const backBtn = document.getElementById('back-btn');
    const restartBtn = document.getElementById('restart-btn');
    const timeDisplay = document.getElementById('time-display');
    const winModal = document.getElementById('win-modal');
    const playAgainBtn = document.getElementById('play-again-btn');
    const finalTimeSpan = document.getElementById('final-time');

    let gridSize = 3; // 3x3 grid
    let tiles = []; // Array to store current state
    let emptyTileIndex = 8; // Last tile is empty (3x3 = 9 tiles, index 0-8)
    let solvedState = []; // Array for solved state [0, 1, 2, ..., 8]
    let timerInterval;
    let seconds = 0;
    let isPlaying = false;
    let currentImageSrc = '';

    // Initialize Selection Screen
    document.querySelectorAll('.puzzle-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            currentImageSrc = thumb.dataset.src;
            startGame(currentImageSrc);
        });
    });

    backBtn.addEventListener('click', showSelectionScreen);
    restartBtn.addEventListener('click', shuffleBoard);
    playAgainBtn.addEventListener('click', () => {
        winModal.classList.add('hidden');
        showSelectionScreen();
    });

    function showSelectionScreen() {
        stopTimer();
        gameScreen.classList.remove('visible');
        gameScreen.classList.add('hidden');
        selectionScreen.classList.remove('hidden');
        selectionScreen.classList.add('visible');
    }

    function startGame(imageSrc) {
        selectionScreen.classList.add('hidden');
        selectionScreen.classList.remove('visible');
        gameScreen.classList.remove('hidden');
        gameScreen.classList.add('visible');

        refImg.src = imageSrc;

        // Reset Timer
        stopTimer();
        seconds = 0;
        timeDisplay.innerText = "00:00";

        initBoard(imageSrc);
        shuffleBoard();
        startTimer();
    }

    function initBoard(imageSrc) {
        puzzleBoard.innerHTML = '';
        tiles = [];
        solvedState = [];

        // CSS Grid setup
        puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        puzzleBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

        const tileCount = gridSize * gridSize;
        emptyTileIndex = tileCount - 1;

        // Calculate tile sizes
        // We need the computed style size of the board to set background size correctly
        // But for simplicity, we rely on the CSS fixed sizes (500px desktop, etc)
        // We just need to set background position percentages

        for (let i = 0; i < tileCount; i++) {
            solvedState.push(i);
            tiles.push(i);

            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.index = i; // Current position

            if (i === emptyTileIndex) {
                tile.classList.add('empty');
            } else {
                tile.style.backgroundImage = `url('${imageSrc}')`;

                // Calculate background position
                // Col and Row of the ORIGINAL position (i)
                const col = i % gridSize;
                const row = Math.floor(i / gridSize);

                const percentageStep = 100 / (gridSize - 1);

                tile.style.backgroundPosition = `${col * percentageStep}% ${row * percentageStep}%`;
            }

            tile.addEventListener('click', () => handleTileClick(i));
            puzzleBoard.appendChild(tile);
        }
    }

    function handleTileClick(clickedIndex) {
        if (!isPlaying) return;

        // Check if adjacent to empty tile
        const emptyRow = Math.floor(emptyTileIndex / gridSize);
        const emptyCol = emptyTileIndex % gridSize;

        const clickedRow = Math.floor(clickedIndex / gridSize);
        const clickedCol = clickedIndex % gridSize;

        const isAdjacent = (
            (Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
            (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow)
        );

        if (isAdjacent) {
            swapTiles(clickedIndex, emptyTileIndex);
            checkWin();
        }
    }

    function swapTiles(idx1, idx2) {
        // Swap in array
        [tiles[idx1], tiles[idx2]] = [tiles[idx2], tiles[idx1]];

        // Update DOM
        const tile1 = puzzleBoard.children[idx1];
        const tile2 = puzzleBoard.children[idx2];

        // We have to swap the styling and content, or clearer: just re-render
        // or swap classes and background properties.
        // Easiest is to swap properties.

        const bgImg1 = tile1.style.backgroundImage;
        const bgPos1 = tile1.style.backgroundPosition;
        const class1 = tile1.className;

        const bgImg2 = tile2.style.backgroundImage;
        const bgPos2 = tile2.style.backgroundPosition;
        const class2 = tile2.className;

        tile1.style.backgroundImage = bgImg2;
        tile1.style.backgroundPosition = bgPos2;
        tile1.className = class2;

        tile2.style.backgroundImage = bgImg1;
        tile2.style.backgroundPosition = bgPos1;
        tile2.className = class1;

        // Update global empty index tracker
        if (tile1.classList.contains('empty')) emptyTileIndex = idx1;
        else if (tile2.classList.contains('empty')) emptyTileIndex = idx2;
    }

    function shuffleBoard() {
        isPlaying = false;
        // Make N random valid moves to ensure solvability
        // 100 random moves
        let moves = 0;
        const maxMoves = 100;

        const interval = setInterval(() => {
            const validMoves = [];
            const emptyRow = Math.floor(emptyTileIndex / gridSize);
            const emptyCol = emptyTileIndex % gridSize;

            // Check Up
            if (emptyRow > 0) validMoves.push(emptyTileIndex - gridSize);
            // Check Down
            if (emptyRow < gridSize - 1) validMoves.push(emptyTileIndex + gridSize);
            // Check Left
            if (emptyCol > 0) validMoves.push(emptyTileIndex - 1);
            // Check Right
            if (emptyCol < gridSize - 1) validMoves.push(emptyTileIndex + 1);

            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            swapTiles(randomMove, emptyTileIndex);

            moves++;
            if (moves >= maxMoves) {
                clearInterval(interval);
                isPlaying = true;
            }
        }, 5); // Fast shuffle animation
    }

    function checkWin() {
        if (!isPlaying) return;

        // Check if every tile is in its correct original position
        // We need to check the actual background position matches the index
        // Or simpler: We maintain the `tiles` array which stores the "original index" at "current index".
        // Wait, my `swapTiles` swapped visual properties but didn't update the `tiles` array content logic fully aligned with DOM?
        // Actually, `swapTiles` updated `tiles` array.
        // But what defines "correct"?
        // `tiles` array content should be `0, 1, 2, ...` in order.

        // Wait, `initBoard` pushed `i` (original index) to `tiles`.
        // `swapTiles` swaps elements in `tiles`.
        // So validation is: `tiles[i] === i` for all i.

        // However, I introduced a bug in `swapTiles`. I updated the DOM using the `backgroundImage` etc, which represents the visual tile. 
        // AND I swapped the `tiles` array.
        // So yes, `tiles[i]` represents which tile is currently at position `i`.
        // If `tiles[0]` is `0` (the top left slice), and `tiles[1]` is `1`, we are good.

        // Let's verify:
        // `initBoard`: tiles[0] = 0. DOM index 0 has bg of slice 0.
        // Swap 0 and 1:
        // tiles[0] becomes 1, tiles[1] becomes 0.
        // DOM index 0 gets slice 1 visual. DOM index 1 gets slice 0 visual.
        // So `tiles[0]` holds 1. The visual at 0 is slice 1.
        // Correct.

        const isWin = tiles.every((tileValue, index) => tileValue === index);

        if (isWin) {
            isPlaying = false;
            stopTimer();
            finalTimeSpan.innerText = timeDisplay.innerText;
            winModal.classList.remove('hidden');
        }
    }

    // Timer Logic
    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timeDisplay.innerText = `${pad(mins)}:${pad(secs)}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function pad(val) {
        return val < 10 ? '0' + val : val;
    }

});
