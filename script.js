document.getElementById('bukutamuform').addEventListener('submit', function(e){
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const loadingIcon = document.getElementById('loading');
    const nama = document.getElementById('Nama').value;
    const alamat = document.getElementById('Alamat').value;
    const pesan = document.getElementById('Pesan').value;

    submitBtn.disabled = true;
    loadingIcon.classList.remove('d-none');

    fetch('https://script.google.com/macros/s/AKfycbwl6LRdpo344YPgHHVfSraO8ikTjY3FK5VLr8V1ardrYu6NM46-IIH7Jg5HlNgav0TrdA/exec', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'Nama' : nama,
            'Alamat' : alamat,
            'Pesan' : pesan,
        })
    })
    .then(response => response.text())
    .then(data =>{
        submitBtn.disabled = false;
        loadingIcon.classList.add('d-none');
        Swal.fire({
            title: 'Berhasil',
            text: 'Data berhasil disimpan',
            icon: 'success',
            confirmButton: 'OK'
        }).then((result) => {
            if(result.isConfirmed){
                window.location.href = 'index.html'
            }
        });
    })
    .catch((error) => {
        submitBtn.disabled = false;
        loadingIcon.classList.add('d-none');
        console.log('Error:', error);
        Swal.fire({
            title: 'Gagal',
            text: 'Gagal ditambah, karena' - error.message,
            icon:'error',
            confirmButton:'OK'
        })
    });
})