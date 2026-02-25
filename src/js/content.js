//---------------------------------------------تبدیل تاریخ به فارسی و راست چین کردنش
const getInputs = document.querySelectorAll(".persian-numbers");

const now = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
};
const parts = new Intl.DateTimeFormat("fa-IR", options).formatToParts(now);

const weekday = parts.find((p) => p.type === "weekday").value;
const day = parts.find((p) => p.type === "day").value;
const month = parts.find((p) => p.type === "month").value;
const year = parts.find((p) => p.type === "year").value;

const fullDate = `${weekday}، ${day} ${month} ${year}`;
document.querySelector(".dynamic-date").textContent = fullDate;

//پایان تبدیل تاریخ به فارسی و راست چین کردنش----------------------------------------

//وارد کردن عدد به قسمت های اینپوت برنامه و تبدیل به فارسی و با درنظر گرفتن حالت های متفاوت که وقتی کلیک میشه همچنان صفر باشه و ....

//تابع تبدیل اعدا انگلیسی به فارسی مشترک هست برای فارسی سازی تمام اینپوت ها

function enToFaNumbers(str) {
  const enNums = ["0","1","2","3","4","5","6","7","8","9"];
  const faNums = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return str.replace(/\d/g, (d) => faNums[enNums.indexOf(d)]);
}
function faToEnNumbers(str){
  const enNums = ["0","1","2","3","4","5","6","7","8","9"];
  const faNums = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return str.replace(/[۰-۹]/g, (d) => enNums[faNums.indexOf(d)]);
}
function setCursorToEnd(el) {
  el.selectionStart = el.selectionEnd = el.value.length;
}

document.getElementById('gold-price').onkeyup = function() {
  let val = this.value;
   // تبدیل فارسی به انگلیسی
  val = faToEnNumbers(val);
   // حذف کاما
  val = val.replace(/,/g, '');
  // جداکردن سه رقم سه رقم
  val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
   // تبدیل انگلیسی به فارسی
  val = enToFaNumbers(val);
  this.value = val;
  // کرسر انتهای متن
  setCursorToEnd(this); 
}



















// مشخص کردن جای کرسر یا مکان نما که باید اخر باشه
function setCursorToEnd(element) {
  const length = element.value.length;
  element.setSelectionRange(length, length);
}

// اگر کاربر اومد و فوکوس کرد یا کلیک کرد همون صفر اولیه باقی بمونه
getInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    if (input.value === "۰") {
      // کاری نیاز نیست انجام بشه اینجا همون صفرباقی بمونه
    }
  });
});

// حالا اگر کاربر شروع کرد تغییر مقدار اینپوت
getInputs.forEach((input) => {
  input.addEventListener("input", () => {
    // تبدیل عدد انگلیسی به فارسی
    input.value = enToFaNumbers(input.value);

    // اگر عددی که کاربر وارد  صفر  بود وطولش هم برابر یک بود همون صفر باقی بمونه
    if (input.value === "۰" && input.value.length === 1) {
      return;
    }

    // اگر عددی که کاربر وارد میکنه قبلش صفر داشت و طولش هم بیشتر از یک بود اون صفر اولیه رو حذف کن
    if (input.value.startsWith("۰") && input.value.length > 1) {
      input.value = input.value.substring(1);
      setCursorToEnd(input);
    }

    // اگر توی اینپوت بودیم و هیچی نبود یا ننوشتیم مجدد صفر رو نشون بده
    if (input.value === "") {
      input.value = "۰";
      setCursorToEnd(input);
    }
  });
});

// اگر کاربر رفت بیرون از اینپوت و کلیک کرد و عددی ننوشته بود توی اینپوت بیا و عدد صفر رو نشون بده بهش
getInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.value = "۰";
    }
  });
});
// پایان وارد کردن اعداد به قسمت های اینپوت برناکه و تبدیل به فارسی و با ذر نظر گرفتن حالت های متفائت که وقتی کلیک میشه همچنان صفر باقی بمونه

//-------------------------------------انتخاب کردن اینپوت ها و انجام عملیات روی انها

// تابع تبدیل عدد فارسی به انگلیسی برای محاسبه
function faToEnNumber(str) {
  const faNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const enNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return str.replace(/[۰-۹]/g, (w) => {
    return enNums[faNums.indexOf(w)];
  });
}

// انتخاب کردن اینپوت هایی که قرار مقدارشون گرفته بشه و گرفتن اون المنت مورد نظر که قرار قیمت رو نشون بده
const goldPrice = document.getElementById("gold-price");
const goldWeight = document.getElementById("gold-weight");
const totalPrice = document.getElementById("total-price");
const makingCharges = document.getElementById("making-charges");
const profitMargin = document.getElementById("profit-margin");
const tax = document.getElementById("tax");
const productPriceTalaSea = document.getElementById("productPrice-TalaSea");
const profitMarginTalaSea = document.getElementById("profitMargin-talaSea");
const totalPriceBazar = document.getElementById("totalPrice-Bazar");
const totalPriceTalaSea = document.getElementById("totalPrice-TalaSea");

// تابع محاسبه عملیات و نمایش مقدارشون
function calculatePrice() {
  // گرفتن رشته هایی که توی اینپوت قیمت و وزن طلا هست و تبدیلش به انگلیسی
  const price = faToEnNumber(goldPrice.value);
  const weight = faToEnNumber(goldWeight.value);

  // تبدیل مقادیر فوق به عدد اعشاری 
  const priceFloate = parseFloat(price.replace(/,/g, '')) || 0;
  const weightFloat = parseFloat(weight.replace(/,/g, '')) || 0;

  // محاسبه قیمت محصول
 const productPrice = priceFloate * weightFloat;
  // محاسبه اجرت ساخت در بازار
  const numberMakingCharges = "18%";
  const deletePrecent = Number(numberMakingCharges.replace("%" , ''));
  const makingChargesCalc = (deletePrecent /100) * productPrice;
    // سود فروش طلا در بازار 
  const numberProfitMargin = "7%";
  const deletePrecentProfit =Number(numberProfitMargin.replace("%", ''));
  const profitMarginCalc = (productPrice + makingChargesCalc) * deletePrecentProfit /100;
  // مالیات در بازار
  const numberTax ="9%";
  const deletePrecentTax = Number(numberTax.replace("%", ''));
  const taxClac =(profitMarginCalc + makingChargesCalc) * deletePrecentTax /100;

  //سود فروش طلا در طلاسی 
  const numberProfitMarginTalaSea = "1%";
  const deletePrecentTalaSea = Number(numberProfitMarginTalaSea.replace("%", ''));
  const profitMarginTalaSeaCalc = (productPrice * deletePrecentTalaSea/100) ;
  
  // محاسبه جمع کل به تومان برای خرید از بازار
  const totalPriceBazarCalc= productPrice + makingChargesCalc + profitMarginCalc + taxClac;
  
  // محاسبه جمع کل به تومان برای خرید طلا از طلاسی
  const totalPriceTalaSeaCalc = productPrice + profitMarginTalaSeaCalc;

  // نشون دادن حاصل محاسبات در دام
  totalPrice.textContent = enToFaNumbers(productPrice.toLocaleString("en-US")) + ' تومان';
  makingCharges.textContent = enToFaNumbers(makingChargesCalc.toLocaleString("en-US")) + ' تومان';
  profitMargin.textContent = enToFaNumbers(profitMarginCalc.toLocaleString("en-US")) + ' تومان';
  tax.textContent = enToFaNumbers(taxClac.toLocaleString("en-US")) + ' تومان';
  productPriceTalaSea.textContent = enToFaNumbers(productPrice.toLocaleString("en-US")) + ' تومان';
  profitMarginTalaSea.textContent = enToFaNumbers(profitMarginTalaSeaCalc.toLocaleString("en-US")) + ' تومان';
  totalPriceBazar.textContent = enToFaNumbers(totalPriceBazarCalc.toLocaleString("en-US")) + ' تومان';
  totalPriceTalaSea.textContent = enToFaNumbers(totalPriceTalaSeaCalc.toLocaleString("en-US")) + ' تومان'
}

  //بیا هروقت اینپوت ها اومدن داخلشون نوشتن تابع فوق رو اجرا کن 
  goldPrice.addEventListener("input",calculatePrice);
  goldWeight.addEventListener("input",calculatePrice);




  // تابع رو صدا بزن که اجرا بشه
  calculatePrice();
//پایان انتخاب کردن اینپوت ها و انجام عملیات روی انها-----------------------------
