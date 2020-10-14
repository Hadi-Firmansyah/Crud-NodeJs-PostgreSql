//CATATAN DOANG
CREATE DATABASE db_siswa;

CREATE TABLE siswa(
    id SERIAL PRIMARY KEY,
    nisn VARCHAR(255),
    nama VARCHAR(255),
    jkl VARCHAR(255),
    alamat VARCHAR(255),
    kelas VARCHAR(255),
    jurusan VARCHAR(255)
);
