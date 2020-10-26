const multer = require('multer');
const Log = require('../models/logModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const timeExtractor = require('./../utils/timeExtractor');

// For seeding data
const GiangVien = require('./../models/giangvienModel');
const LoaiBang = require('./../models/loaibangModel');
const Lop = require('./../models/lopModel');
const HocVien = require('./../models/hocvienModel');

// This function is for directly store image in local storage in ROM
const multerStorage = multer.diskStorage({
    // cb() is callback, like next() function
    // null is where we specify error
    destination: (req, file, cb) => {
        cb(null, 'public/img/attendance');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image, please upload image only !', 400), false);
    }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.upLoadAttendancePhoto = imageField => upload.single(imageField); // 'imageField' is the field name from html form, 'single' image

exports.checkIn = catchAsync(async (req, res, next) => {
    const { idHocVien, checkInAt } = req.body;
    const imageCheckIn = req.file.filename;

    if (await HocVien.findById(idHocVien)) {

        //TODO: Check clock to response "Check in not available at that moment"
        const { day, month, year, hour, minute, second } = timeExtractor.javaTimeExtractorToString(checkInAt);

        const data = {
            idHocVien,
            imageCheckIn,
            checkInAt: `${year}-${month}-${day}T${hour}:${minute}:${second}`,
        };

        try {
            const newAttendance = await Log.create(data);
            res.status(201).json({
                //201 Created
                status: 'success',
                message: 'Successfully check in !',
                id: newAttendance._id,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                // 400 Bad Request
                status: 'fail',
                message: 'Check in failed !'
            });
        }

    } else {
        return next(new AppError("Không tìm thấy học viên với id cung cấp", 404));
    }

});

exports.checkOut = catchAsync(async (req, res, next) => {
    const { id, checkOutAt } = req.body;
    const imageCheckOut = req.file.filename;

    // TODO: Check clock to response "Check out not available at that moment"
    const attendance = await Log.findById(id);
    if (attendance) {
        const {day, month, year, hour, minute, second} = timeExtractor.javaTimeExtractorToString(checkOutAt);

        const totalTime = attendance.calculateTotalTime(checkOutAt)
        const data = {
            checkOutAt: `${year}-${month}-${day}T${hour}:${minute}:${second}`,
            imageCheckOut,
            totalTime,
        };
        try {
            await Log.findByIdAndUpdate(attendance._id, data);
            res.status(200).json({
                status: 'success',
                message: 'Success check out !',
                totalTime: totalTime
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'You did not check in before !'
        });
    }
});

exports.seeding = catchAsync(async (req, res, next) => {
    const dataGiangVien = {
        ten: "Nguyen Duy Truong Giang",
        ngaySinh: new Date(1970, 3, 10),
        gioiTinh: true,
        cmnd: "031974239",
        sdt: "0124124324",
        diaChi: "Hai Phong",
        email: "giang@gmail.com",
        isBienChe: true,
    };

    const dataLoaiBang = {
        tenBang: "B1",
        thoiGianHoc: 360,
        chuThich: "Hoc du 360h",

    }

    const dataLop = {
        tenLop: "TH01",
        khaiGiang: new Date(2020, 12, 10),
        idGiangVien: "5f86b2442cb42916b0855e14",
        idLoaiBang: "5f86dd586debca3b30c3794c",
    }

    const dataHocVien = {
        ten: "Nguyễn Thanh Tùng",
        ngaySinh: new Date(1998, 2, 14),
        gioiTinh: true,
        cmnd: "368085421",
        sdt: "0276988769",
        diaChi: "Hà Nội",
        email: "tung@gmail.com",
        idLop: "5f86df0316573f3ccde52436",
        pending: false,
        ngayTao: Date.now(),
        hasCmnd: true,
        hasGksk: true,
        hasSyll: true,
        hasAnh: true,
        hasDongdangky: true,
    };

    try {
        const dataCreated = await HocVien.create(dataHocVien);
        // const dataCreated = await GiangVien.findByIdAndUpdate("5f86b2442cb42916b0855e14", {
        //     account: "5f86b6b2dc7e1b185d7dfb1d",
        // })

        console.log(dataCreated);
        res.status(201).json({
            //201 Created
            status: 'success',
            message: 'Successfully seeding !',
            data: dataCreated
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            // 400 Bad Request
            status: 'fail',
            message: 'Seeding failed !'
        });
    }
});
