const catchAsync = require('./../utils/catchAsync');

const User = require('../models/userModel')

exports.showHomePage = (req, res, next) => {
    res.render('frontend', {page : "F_home"})
}

exports.showLoginPage = (req, res, next) => {
    res.render('authentic', {page : "login"})
}

exports.showSignUpPage = (req, res, next) => {
    res.render('authentic', {page : "signup"})
}

exports.dangKyOnline = (req, res, next) => {
    res.render('frontend', {page : "F_dangkyonline"})
}

exports.register = (req, res, next) => {
}

exports.showGioiThieuPage = (req, res, next) => {
    res.render('frontend', {page : "F_gioithieu"})
}

exports.showKhoaHocPage = (req, res, next) => {
    res.render('frontend', {page : "F_khoahoc"})
}

exports.showTaiLieuPage = (req, res, next) => {
    res.render('frontend', {page : "F_tailieu"})
}

exports.showTinTucPage = (req, res, next) => {
    res.render('frontend', {page : "F_tintuc"})
}

exports.showHocPhiPage = (req, res, next) => {
    res.render('frontend', {page : "F_hocphi"})
}

exports.showLienHePage = (req, res, next) => {
    res.render('frontend', {page : "F_lienhe"})
}

exports.showKhoaHocB2Page = (req, res, next) => {
    res.render('frontend', {page : "F_khoahocB2"})
}

exports.showXeMayMoToPage = (req, res, next) => {
    res.render('frontend', {page : "F_xemaymoto"})
}

exports.showHocKhacPage = (req, res, next) => {
    res.render('frontend', {page : "F_hockhac"})
}

exports.showB2TieuChuanPage = (req, res, next) => {
    res.render('frontend', {page : "F_B2tieuchuan"})
}

exports.showB2DacBietPage = (req, res, next) => {
    res.render('frontend', {page : "F_B2dacbiet"})
}

exports.showB2ChiThiPage = (req, res, next) => {
    res.render('frontend', {page : "F_B2chithi"})
}

exports.showXeSoTuDongB11Page = (req, res, next) => {
    res.render('frontend', {page : "F_xesotudongB11"})
}

exports.showLaiXeA1Page = (req, res, next) => {
    res.render('frontend', {page : "F_laixeA1"})
}

exports.showMoToA2Page = (req, res, next) => {
    res.render('frontend', {page : "F_motoA2"})
}

exports.showLaiXeA3Page = (req, res, next) => {
    res.render('frontend', {page : "F_laixeA3"})
}

exports.showXeTaiCPage = (req, res, next) => {
    res.render('frontend', {page : "F_xetaiC"})
}

exports.showThueXePage = (req, res, next) => {
    res.render('frontend', {page : "F_thuexe"})
}

exports.showNangHangPage = (req, res, next) => {
    res.render('frontend', {page : "F_nanghang"})
}

exports.showTaiLieuLyThuyetPage = (req, res, next) => {
    res.render('frontend', {page : "F_tailieulythuyet"})
}

exports.showTaiLieuThucHanhPage = (req, res, next) => {
    res.render('frontend', {page : "F_tailieuthuchanh"})
}

exports.showTinTucoToPage = (req, res, next) => {
    res.render('frontend', {page : "F_tintucoto"})
}

exports.showTinTucTrungTamPage = (req, res, next) => {
    res.render('frontend', {page : "F_tintuctrungtam"})
}

exports.showThuGianPage = (req, res, next) => {
    res.render('frontend', {page : "F_thugian"})
}

exports.showMeNuHocPhiPage = (req, res, next) => {
    res.render('frontend', {page : "F_menuhocphi"})
}

exports.showCachThucDangKyPage = (req, res, next) => {
    res.render('frontend', {page : "F_cachthucdangky"})
}