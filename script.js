// مصفوفة المقالات مع حفظ في الذاكرة
let posts = JSON.parse(localStorage.getItem('wacut_dragon_data')) || [];

function render() {
    const area = document.getElementById('articlesArea');
    const counter = document.getElementById('postCountDisplay'); // سيتم تحديثه عبر المعرف
    
    area.innerHTML = '';
    posts.forEach((item, index) => {
        area.innerHTML += `
            <div class="article-box shadow">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-warning fw-bold mb-0">${item.title}</h4>
                    <button onclick="handleDelete(${index})" class="btn btn-sm btn-outline-danger border-0">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <p class="opacity-75" style="white-space: pre-wrap;">${item.content}</p>
                <div class="mt-4 pt-2 border-top border-secondary d-flex justify-content-between">
                    <small class="text-muted"><i class="far fa-user me-1"></i> Wacut_e Admin</small>
                    <small class="text-muted"><i class="far fa-clock me-1"></i> ${item.date}</small>
                </div>
            </div>
        `;
    });
    
    // تحديث العداد في النافبار
    document.getElementById('postCounter').innerText = "المقالات: " + posts.length;
    localStorage.setItem('wacut_dragon_data', JSON.stringify(posts));
}

function handlePublish() {
    const t = document.getElementById('postTitle').value.trim();
    const c = document.getElementById('postContent').value.trim();

    if (t === "" || c === "") {
        alert("يرجى إدخال بيانات المقال كاملة!");
        return;
    }

    const newPost = {
        title: t,
        content: c,
        date: new Date().toLocaleString('ar-EG')
    };

    posts.unshift(newPost);
    render();

    // مسح الحقول
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
}

function handleDelete(index) {
    if(confirm("هل أنت متأكد من رغبتك في حذف هذا المقال؟")) {
        posts.splice(index, 1);
        render();
    }
}

// تشغيل عند التحميل
window.onload = render;
