document.addEventListener('DOMContentLoaded', function() {
    // Tạo container cho hiệu ứng split
    const splitContainer = document.createElement('div');
    splitContainer.className = 'split-container';
    
    // Tạo hai phần của ảnh
    const leftHalf = document.createElement('div');
    leftHalf.className = 'split-half split-left';
    
    const rightHalf = document.createElement('div');
    rightHalf.className = 'split-half split-right';
    
    // Thêm ảnh vào mỗi nửa
    const leftImg = document.createElement('img');
    leftImg.src = 'https://res.cloudinary.com/devdnfoyh/image/upload/v1761643943/nenmobile_hhcxgd.jpg';
    
    const rightImg = document.createElement('img');
    rightImg.src = 'https://res.cloudinary.com/devdnfoyh/image/upload/v1761643943/nenmobile_hhcxgd.jpg';
    
    leftHalf.appendChild(leftImg);
    rightHalf.appendChild(rightImg);
    
    // Thêm vào container
    splitContainer.appendChild(leftHalf);
    splitContainer.appendChild(rightHalf);
    
    // Thêm container vào body
    document.body.appendChild(splitContainer);

    // Tự động xóa hiệu ứng sau khi hoàn thành
    setTimeout(() => {
        splitContainer.style.opacity = '0';
        setTimeout(() => {
            splitContainer.remove();
        }, 500);
    }, 3000); // 3 giây - khớp với thời gian animation mới
});