// https://github.com/mirhmousavi/Regex.Persian.Language
// https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
function characterRange(startChar, endChar) {
    return String.fromCharCode(...range(endChar.charCodeAt(0) -
        startChar.charCodeAt(0) + 1, startChar.charCodeAt(0)))
}
var space_codepoints ='\u0020'+ characterRange('\u2000' , '\u200f'); + characterRange('\u2028' , '\u202f');
var persian_alpha_codepoints =
    characterRange('\u0621' , '\u0628') +
    characterRange('\u062A' , '\u063A') +
    characterRange('\u0641' , '\u0642') +
    characterRange('\u0644' , '\u0648') +
    characterRange('\u064E' , '\u0651') +
    '\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC';
var additional_arabic_characters_codepoints = '\u0629\u0643\u0649\u064A\u064B\u064D\u06D5';

let total_valid_chars = space_codepoints + persian_alpha_codepoints + additional_arabic_characters_codepoints;
function is_persian_letters(persianText) {
    if(!new RegExp("[^\s" + total_valid_chars + "]").test(persianText)){
        // valid
        return true;
    }
    return false;
}
function is_english_letters(englishText) {
    return !( new RegExp("[^\sa-zA-Z]").test(englishText));
}
function check_nationoal_code(code)
{
    var s=0;
    for(var i=0;i<9;i++)
        s+=parseInt(code.substr(i,1))*(10-i);
    s=s%11;
    var c = parseInt(code)%10;
    return (s<2 && c==s) || (s>=2 && c==(11-s));
}


function is_first_name_valid(){
    let first_name = document.getElementById("firstname").value;
    return first_name.length >= 3 && first_name.length <= 50 && is_persian_letters(first_name);
}
function is_last_name_valid(){
    let last_name = document.getElementById("lastname").value;
    return last_name.length >= 3 && last_name.length <= 100 && is_persian_letters(last_name);
}

function is_full_name_valid(){
    let full_name = document.getElementById("fullname").value;
    return full_name.length >= 3 && full_name.length <= 150 && is_english_letters(full_name.replaceAll(' ' , ''));
}
function is_natinoal_code_valid(){
    let national_code = document.getElementById("national_code").value;
    return national_code.length == 10 &&
        !( new RegExp("[^\s0-9]").test(national_code)) &&
        check_nationoal_code(national_code)
        ;
}
function is_email_valid(){
    let email = document.getElementById("email").value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function is_mobile_valid(){
    let mobile = document.getElementById("phone").value;
    return mobile.length == 9 &&
        !( new RegExp("[^\s0-9]").test(mobile));
}
function is_password_valid(){
    let password = document.getElementById("password").value;
    let pattern = /^[a-zA-Z0-9=*$#!+\-]{8,24}$/
    return pattern.test(password);
}
function is_password_confirm_valid(){
    let confirm = document.getElementById("password_confirm").value;
    let password = document.getElementById("password").value;
    return password == confirm && is_password_valid();
}
function is_address_valid(){
    return document.getElementById("address").value.length <= 250;
}
function is_birth_day_valid(){
    // check if month has been entered :
    let month = document.getElementById("birthmonth").value;
    var maxDay = 31;
    if(!(month == null || month == '')){
        if(parseInt(month) > 6){
            maxDay = 30;
        }
    }
    let day = parseInt(document.getElementById("birthday").value);
    return day > 0 && day <= maxDay;
}
function is_birth_month_valid(){
    let month = parseInt(document.getElementById("birthmonth").value);
    return month > 0 && month <= 12;
}
function is_birth_year_valid(){
    let year = parseInt(document.getElementById("birthyear").value);
    return year <= 1390 && year >= 1310;
}
function is_marital_status_valid(){
    let marital = document.getElementsByName("marital");
    if (!(marital[0].checked || marital[1].checked)) {
        return false;
    }
    return true;
}

function validate(){
    error_message = "";
    first_name = document.getElementById("firstname");
    if(is_first_name_valid()){
        first_name.classList.add("valid");
        first_name.classList.remove("invalid");
    }else{
        first_name.classList.add("invalid");
        first_name.classList.remove("valid");
        error_message += "نام  باید فارسی و بین ۳ تا ۳۰ حرف باشد\n";
    }

    last_name = document.getElementById("lastname");
    if(is_last_name_valid()){
        last_name.classList.add("valid");
        last_name.classList.remove("invalid");
    }else{
        last_name.classList.add("invalid");
        last_name.classList.remove("valid");
        error_message += "نام خانوادگی باید فارسی بین ۳ تا ۱۰۰ حرف باشد\n";
    }

    full_name = document.getElementById("fullname");
    if(is_full_name_valid()){
        full_name.classList.add("valid");
        full_name.classList.remove("invalid");
    }else {
        full_name.classList.add("invalid");
        full_name.classList.remove("valid");
        error_message += "نام کامل انگلیسی باید بین ۳ تا ۱۵۰ حرف باشد\n";
    }


    birth_day = document.getElementById("birthday");
    if(is_birth_day_valid()){
        birth_day.classList.add("valid");
        birth_day.classList.remove("invalid");
    }else{
        birth_day.classList.add("invalid");
        birth_day.classList.remove("valid");
        error_message += "روز تولد را اصلاح کنید\n";
    }


    birth_month = document.getElementById("birthmonth");
    if(is_birth_month_valid()){
        birth_month.classList.add("valid");
        birth_month.classList.remove("invalid");
    }else{
        birth_month.classList.add("invalid");
        birth_month.classList.remove("valid");
        error_message += "ماه تولد را اصلاح کنید\n";
    }

    birth_year = document.getElementById("birthyear");
    if(is_birth_year_valid()){
        birth_year.classList.add("valid");
        birth_year.classList.remove("invalid");
    }else{
        birth_year.classList.add("invalid");
        birth_year.classList.remove("valid");
        error_message += "سال تولد را اصلاح کنید\n";
    }

    email = document.getElementById("email");
    if(is_email_valid()){
        email.classList.add("valid");
        email.classList.remove("invalid");
    }else{
        email.classList.add("invalid");
        email.classList.remove("valid");
        error_message += "ایمیل معتبر وارد کنید\n";

    }

    phone = document.getElementById("phone");
    if(is_mobile_valid()){
        phone.classList.add("valid");
        phone.classList.remove("invalid");
    }else{
        phone.classList.add("invalid");
        phone.classList.remove("valid");
        error_message += "شماره موبایل درست وارد کنید.\n";
    }

    national_code = document.getElementById("national_code");
    if(is_natinoal_code_valid()){
        national_code.classList.add("valid");
        national_code.classList.remove("invalid");
    }else{
        national_code.classList.add("invalid");
        national_code.classList.remove("valid");
        error_message += "کد ملی معتبر وارد کنید\n";
    }

    password = document.getElementById("password");
    if(is_password_valid()){
        password.classList.add("valid");
        password.classList.remove("invalid");
    }else{
        password.classList.add("invalid");
        password.classList.remove("valid");
        error_message += "رمز می‌تواند فقط اعداد، الفبای انگلیسی و =*$#!+- فقط اعداد، الفبای انگلیسی و =*$#!+- باشد و طول آن باید بین ۸ تا ۲۴ باشد\n";
    }

    password_confirm = document.getElementById("password_confirm");
    if(is_password_confirm_valid()){
        password_confirm.classList.add("valid");
        password_confirm.classList.remove("invalid");
    }else{
        password_confirm.classList.add("invalid");
        password_confirm.classList.remove("valid");
        error_message += "تکرار رمز را مجددا بررسی کنید\n";
    }

    address = document.getElementById("address");
    if(is_address_valid()){
        address.classList.add("valid");
        address.classList.remove("invalid");
    }else{
        address.classList.add("invalid");
        address.classList.remove("valid");
        error_message += "طول آدرس نباید بیش از ۲۵۰ حرف باشد\n";
    }

    marital_div = document.getElementById("marital");
    if(is_marital_status_valid()){
        marital_div.classList.remove("invalid");
    }else {
        marital_div.classList.add("invalid");
        error_message += "وضعیت تأهل را مشخص کنید\n";
    }

    document.getElementById("info").innerHTML = (error_message.replaceAll('\n','<br>'));

    return error_message == "";

}
