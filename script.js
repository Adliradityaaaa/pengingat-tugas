document.addEventListener("DOMContentLoaded", () => {
    // Meminta izin untuk notifikasi
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    // Mengambil elemen-elemen yang diperlukan
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");

    // Event ketika form disubmit
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Mengambil nilai dari form
        const taskName = document.getElementById("task-name").value;
        const taskDeadline = new Date(document.getElementById("task-deadline").value);

        // Validasi deadline harus di masa depan
        if (taskDeadline <= new Date()) {
            alert("Deadline harus di masa depan!");
            return;
        }

        // Membuat elemen tugas baru
        const taskItem = document.createElement("li");
        taskItem.textContent = `${taskName} - Deadline: ${taskDeadline.toLocaleString()}`;
        taskList.appendChild(taskItem);

        // Mengatur timer untuk notifikasi
        const timeToNotification = taskDeadline - new Date();
        setTimeout(() => {
            showNotification(taskName);
        }, timeToNotification);

        // Mereset form setelah menambahkan tugas
        taskForm.reset();
    });
});

// Fungsi untuk menampilkan notifikasi
function showNotification(taskName) {
    if (Notification.permission === "granted") {
        new Notification("Pengingat Tugas", {
            body: `Sudah waktunya mengerjakan: ${taskName}!`,
            icon: "https://via.placeholder.com/100"
        });
    }
}