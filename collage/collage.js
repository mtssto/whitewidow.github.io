/* Collage Creator Logic */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('collage-canvas');
    const paletteItems = document.querySelectorAll('.sticker-source');
    const controls = document.getElementById('item-controls');
    const scaleSlider = document.getElementById('scale-slider');
    const rotateSlider = document.getElementById('rotate-slider');
    const btnDelete = document.getElementById('btn-delete');
    const btnFront = document.getElementById('btn-front');
    const btnBack = document.getElementById('btn-back');
    const btnClear = document.getElementById('clear-btn');
    const btnDownload = document.getElementById('download-btn');
    const placeholder = document.querySelector('.placeholder-text');

    let selectedItem = null;
    let zIndexCounter = 10;

    // 1. Add Items
    paletteItems.forEach(img => {
        // Support Drag from Palette
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', img.src);
            e.dataTransfer.effectAllowed = 'copy';
        });

        // Support Click to Add
        img.addEventListener('click', () => {
            addItemToCanvas(img.src);
        });
    });

    // Handle Drop on Canvas
    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const src = e.dataTransfer.getData('text/plain');
        if (src) {
            // Calculate drop position relative to canvas
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addItemToCanvas(src, x, y);
        }
    });

    function addItemToCanvas(src, x = null, y = null) {
        if (placeholder) placeholder.style.display = 'none';

        const div = document.createElement('div');
        div.classList.add('canvas-item');
        // Initial state
        div.dataset.scale = 1;
        div.dataset.rotation = 0;
        div.style.zIndex = zIndexCounter++;

        const img = document.createElement('img');
        img.src = src;
        div.appendChild(img);

        canvas.appendChild(div);

        // Position
        // If x/y not provided, center it
        img.onload = () => {
            // We need natural dimensions to center properly or set a default size
            const baseWidth = 150; // default width
            const ratio = img.naturalHeight / img.naturalWidth;
            div.style.width = `${baseWidth}px`;
            div.style.height = `${baseWidth * ratio}px`;

            if (x === null) {
                div.style.left = (canvas.offsetWidth / 2 - baseWidth / 2) + 'px';
                div.style.top = (canvas.offsetHeight / 2 - (baseWidth * ratio) / 2) + 'px';
            } else {
                div.style.left = (x - baseWidth / 2) + 'px';
                div.style.top = (y - (baseWidth * ratio) / 2) + 'px';
            }
        };

        // Attach events
        initDraggable(div);

        // Auto-select
        selectItem(div);
    }

    // 2. Item Interaction (Drag & Select)
    function initDraggable(el) {
        el.addEventListener('mousedown', startDrag);
        el.addEventListener('touchstart', startDrag, { passive: false });

        // Select on click (mousedown handles it mostly, but separate click ensures selection logic runs cleanly)
        el.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent canvas background click
            selectItem(el);
        });
    }

    let isDragging = false;
    let dragItem = null;
    let dragStartX, dragStartY;
    let initialLeft, initialTop;

    function startDrag(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

        e.preventDefault(); // Stop text selection

        // If touch
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        isDragging = true;
        dragItem = e.currentTarget; // The .canvas-item div
        selectItem(dragItem); // Ensure selected

        dragStartX = clientX;
        dragStartY = clientY;

        initialLeft = parseFloat(dragItem.style.left);
        initialTop = parseFloat(dragItem.style.top);

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', onDrag, { passive: false });
        document.addEventListener('touchend', endDrag);
    }

    function onDrag(e) {
        if (!isDragging || !dragItem) return;
        e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const dx = clientX - dragStartX;
        const dy = clientY - dragStartY;

        dragItem.style.left = `${initialLeft + dx}px`;
        dragItem.style.top = `${initialTop + dy}px`;
    }

    function endDrag() {
        isDragging = false;
        dragItem = null;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', endDrag);
    }

    // 3. Selection & Controls
    function selectItem(el) {
        // Deselect current
        if (selectedItem) {
            selectedItem.classList.remove('selected');
        }

        selectedItem = el;
        selectedItem.classList.add('selected');

        // Sync controls
        scaleSlider.value = selectedItem.dataset.scale || 1;
        rotateSlider.value = selectedItem.dataset.rotation || 0;

        controls.classList.add('visible');
    }

    function deselectAll() {
        if (selectedItem) {
            selectedItem.classList.remove('selected');
            selectedItem = null;
        }
        controls.classList.remove('visible');
    }

    // Background Click to Deselect
    canvas.addEventListener('click', (e) => {
        if (e.target === canvas) {
            deselectAll();
        }
    });

    // Control Listeners
    scaleSlider.addEventListener('input', (e) => {
        if (!selectedItem) return;
        const s = e.target.value;
        const r = selectedItem.dataset.rotation || 0;
        selectedItem.dataset.scale = s;
        updateTransform(selectedItem, s, r);
    });

    rotateSlider.addEventListener('input', (e) => {
        if (!selectedItem) return;
        const r = e.target.value;
        const s = selectedItem.dataset.scale || 1;
        selectedItem.dataset.rotation = r;
        updateTransform(selectedItem, s, r);
    });

    function updateTransform(el, scale, rotation) {
        el.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    }

    btnDelete.addEventListener('click', () => {
        if (selectedItem) {
            selectedItem.remove();
            deselectAll();
            // Show placeholder if empty?
            if (canvas.children.length <= 1) { // 1 because placeholder might be hidden but present, or removed.
                if (placeholder) placeholder.style.display = 'block';
            }
        }
    });

    btnFront.addEventListener('click', () => {
        if (selectedItem) {
            selectedItem.style.zIndex = zIndexCounter++;
        }
    });

    btnBack.addEventListener('click', () => {
        if (selectedItem) {
            // Just decrementing might put it behind canvas if we aren't careful, 
            // but zIndex is relative to stacking context.
            // Safer: find min zIndex and subtract 1.
            // Simplest: just keep it simple.
            selectedItem.style.zIndex = 1;
        }
    });

    btnClear.addEventListener('click', () => {
        if (confirm('Clear canvas?')) {
            // Remove all .canvas-item
            const items = canvas.querySelectorAll('.canvas-item');
            items.forEach(el => el.remove());
            deselectAll();
            if (placeholder) placeholder.style.display = 'block';
        }
    });

    // 4. Download
    btnDownload.addEventListener('click', () => {
        deselectAll(); // Hide borders
        // Use html2canvas
        // We need to ensure html2canvas is loaded.
        if (typeof html2canvas !== 'undefined') {
            html2canvas(canvas, {
                backgroundColor: '#ffffff', // Set white background for image
                scale: 2 // High res
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'my-collage.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        } else {
            alert('Download library not loaded.');
        }
    });

});
