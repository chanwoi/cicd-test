const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // 또는 다른 SMTP 서비스
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: '수신자 이메일 주소', // 수신자 이메일 주소를 설정하세요
    subject: `[GitHub Actions] 워크플로우 실패: ${process.env.GITHUB_WORKFLOW}`,
    text: `워크플로우가 실패했습니다.
    리포지토리: ${process.env.GITHUB_REPOSITORY}
    실행 ID: ${process.env.GITHUB_RUN_ID}
    자세한 내용을 확인하려면: https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
