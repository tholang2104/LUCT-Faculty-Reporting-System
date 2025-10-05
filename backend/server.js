const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const xlsx = require('xlsx');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => res.send('Backend Running...'));

app.get('/export', (req, res) => {
    const data = [
        { Lecturer: 'John Doe', Course: 'Networking', Score: 85 },
        { Lecturer: 'Jane Smith', Course: 'Databases', Score: 92 }
    ];
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Reports');
    const filePath = './reports.xlsx';
    xlsx.writeFile(workbook, filePath);
    res.download(filePath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
