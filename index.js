const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); //=>req.body

//ROUTES//

//get semua data siswa
app.get("/siswa", async (req, res) => {
    try{
        const allSiswa = await pool.query("SELECT * FROM siswa");
        res.json(allSiswa.rows)
    }catch (err) {
        console.error(err.message);
    }
});

//get data siswa berdasarkan id
app.get("/siswa/:id", async (req, res) => {
    const {id} = req.params; //request datanya
    try{
        const siswa = await pool.query("SELECT * FROM siswa WHERE id = $1",
            [id]
        );

    res.json(siswa.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

//create data siswa baru
app.post("/siswa", async (req, res) => {
    try{
       const { nisn } = req.body;
       const { nama } = req.body;
       const { jkl } = req.body;
       const { alamat } = req.body;
       const { kelas } = req.body;
       const { jurusan } = req.body;
       const createSiswa = await pool.query(
           "INSERT INTO siswa (nisn, nama, jkl, alamat, kelas, jurusan) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
           [nisn, nama, jkl, alamat, kelas, jurusan] 
        );

    res.json(createSiswa.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

//update data siswa berdasarkan id
app.put("/siswa/:id", async (req, res) => {
    try{
        const { id } = req.params; //WHERE
        const { nisn } = req.body;
        const { nama } = req.body;
        const { jkl } = req.body;
        const { alamat } = req.body;
        const { kelas } = req.body;
        const { jurusan } = req.body;

        const updateSiswa = await pool.query("UPDATE siswa SET nisn = $1, nama = $2, jkl = $3, alamat = $4, kelas = $5, jurusan = $6   WHERE id = $7",
        [nisn, nama, jkl, alamat, kelas, jurusan, id]
        );

    res.json("Data Siswa berhasil diubah");

    }catch(err){
        console.error(err.message);
    }
});

//delete data siswa berdasarkan id
app.delete("/siswa/:id", async (req, res) => {
    try{    
        const { id } = req.params;
        const deleteSiswa = await pool.query("DELETE FROM siswa WHERE id = $1", 
        [id]
        );
    res.json("Data Siswa berhasil dihapus")
    }catch(err){
        console.error(err.message);
    }
});

app.listen(8080, () => {
    console.log("Server is running on Port 8080");
});