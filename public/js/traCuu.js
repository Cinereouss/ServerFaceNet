const convertSecondToTime = (seconds) => {
    const ss = seconds % 60;
    let hh = Math.floor(seconds / 60);
    const mm = hh % 60;
    hh = Math.floor(hh / 60);

    let hour = '';
    let minute = '';
    let second = '';

    if(hh !== 0) {
        hour = hh + ' giờ ';
    }

    if(mm !== 0) {
        minute = mm + ' phút ';
    }

    if(ss !== 0) {
        second = ss + ' giây';
    }

    return `${hour}${minute}${second}`;
}

const spiner = `<div class="circle-loading"></div>`;
const errorNotifyRender = (identity) => `<div class="no-data-student">
            <img src="/img/undraw_no_data.svg" alt="no-data">
            <h4>Không tìm thấy học viên với số CMND "${identity}"</h4>
        </div>`;

const rowRender = (title, data) => {
    return `<tr><th>${title}</th><td>${data}</td></tr>`
}

const onSearchStudentHandler = () => {
    const identity = $('#identity-input').val().trim();
    if (identity === '') {
        alert('Chưa nhập số CMND');
    } else {
        $('.circle-loading').remove();
        $('.stats-table').empty();
        $('.spinerContainer').append(spiner);
        const url = `${location.protocol}//${location.hostname}:${location.port}/api/v1/student/stats/${identity}`;
        fetch(url)
            .then((res) => {
                if (res.status !== 200) {
                    $('.circle-loading').remove();
                    $('.stats-table').append(errorNotifyRender(identity));
                } else {
                    $('.circle-loading').remove();
                    $('.stats-table').empty();

                    res.json().then(function(data) {
                        console.log(data);
                        $('.stats-table').append(rowRender("Tên", data.data.ten));
                        $('.stats-table').append(rowRender("Ngày sinh", data.data.ngaySinh.split('T')[0]));
                        $('.stats-table').append(rowRender("Giới tính", data.data.gioiTinh ? "Nam" : "Nữ"));
                        $('.stats-table').append(rowRender("Địa chỉ", data.data.diaChi));
                        $('.stats-table').append(rowRender("Đăng kí khuôn mặt", data.data.embedding === null ? "Chưa đăng kí" : "Đã đăng kí"));
                        if (data.data.idLop !== null) {
                            $('.stats-table').append(rowRender("Tên lớp học", data.data.idLop.tenLop));
                            $('.stats-table').append(rowRender("Tên giảng viên", data.data.idLop.idGiangVien.ten));
                            $('.stats-table').append(rowRender("Số điện thoại giảng viên", data.data.idLop.idGiangVien.sdt));
                            $('.stats-table').append(rowRender("Ngày khai giảng", data.data.idLop.khaiGiang).split('T')[0]);
                            $('.stats-table').append(rowRender("Loại bằng học", data.data.idLop.idLoaiBang.tenBang));
                            $('.stats-table').append(rowRender("Thời gian lái xe tiên quyết", data.data.idLop.idLoaiBang.thoiGianHoc + ' giờ'));
                            $('.stats-table').append(rowRender("Tình trạng học thực hành", data.totalTime >  data.data.idLop.idLoaiBang.thoiGianHoc * 3600 ? "Đã qua thực hành lái xe" : "Chưa qua thực hành lái xe"));
                        } else {
                            $('.stats-table').append(rowRender("Tên lớp học", "Chưa được xếp lớp"));
                        }
                        $('.stats-table').append(rowRender("Tổng thời gian đã lái xe", data.totalTime === 0 ? "0 giờ" : convertSecondToTime(data.totalTime)));
                        $('.stats-table').append(rowRender("Tình trạng học lý thuyết", data.data.isPassLyThuyet ? "Đã qua lý thuyết" : "Chưa qua lý thuyết"));
                    });
                }
            })
            .catch((err) => {
                $('.circle-loading').remove();
                alert("Có lỗi khi tra cứu học viên, thử lại sau");
            });
    }
}

$(document).ready(function() {
    $('#btnTraCuu').click(function() {
        onSearchStudentHandler();
    });
});