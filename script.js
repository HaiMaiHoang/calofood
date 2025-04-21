// Header
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

// Dữ liệu food search

const foods = {
    Indomie: { stt: 0, name: "Mì indomie", calo:  432, pro: 9.6, fat: 19.3, carb: 55, dv: "c"},
    Comtrang: { stt: 1, name: "Cơm trắng", calo:  130, pro: 2.4, fat: 0.3, carb: 28, dv: "g"},
    Ucgaac: { stt: 2, name: "Ức gà áp chảo", calo: 255, pro: 31, fat: 10, carb: 0, dv: "g" },
    Beef: { stt: 3, name: "Beef", calo: 120, pro: 100, fat: 100, carb: 100, dv: "g"},
    Tiger: { stt: 4, name: "Tiger", calo: 170, pro: 28, fat: 60, carb: 100, dv: "g"},
    Banhbaochay: { stt: 5, name: "Bánh bao chay", calo: 110, pro: 5.5, fat: 5.3, carb: 16, dv: "c"},
    Ucgal:{ stt: 6, name: "Ức gà luộc", calo: 165, pro: 31, fat: 3.6, carb: 0, dv: "g"},
    Kingcoffee:{ stt: 7, name: "Gói KingCoffee", calo: 65, pro: 0.3, carb: 11.1, fat: 2.2, dv: "c"},
    Tranchau: { stt: 8, name: "Trân châu", calo: 347, pro: 9.5, fat: 0.2, carb: 55, dv: "g" },
    Bunbohue:     { stt: 9,  name: "Bún bò huế",            calo: 478.8, pro: 18.4, fat: 16,   carb: 65.3, dv: "c" },
    Bunbohuegio:  { stt:10,  name: "Bún bò huế (giò)",      calo: 621.8, pro: 30.2, fat: 30.6, carb: 56.4, dv: "c" },
    Bunrieucua:   { stt:11,  name: "Bún riêu cua",          calo: 413,   pro: 17.8, fat: 12.2, carb: 58,   dv: "c" },
    Nuocngotgaz:  { stt:12,  name: "Nước ngọt có gaz",      calo: 144.8, pro: 0,    fat: 0,    carb: 36.2, dv: "c" },
    Raumuong:     { stt:13,  name: "Rau muống",             calo: 19,    pro: 2,    fat: 0.2,  carb: 3.1,  dv: "g" },
    Trungluoc:    { stt:14,  name: "Trứng luộc",            calo: 75,    pro: 6.3,  fat: 5.3,  carb: 0.6,  dv: "c" },
    Trungran:     { stt:15,  name: "Trứng rán",             calo: 91,    pro: 6.7,  fat: 7,    carb: 0.4,  dv: "c" }
};

let checkFoods = {};
let addedFoods = [];

function addToCalories(element, foodKey) {
  // check food
  const item = foods[foodKey];
  if (checkFoods[item.name]) return;
  checkFoods[item.name] = true;
  // add food
  let name = item.name;
  let calo = item.calo;
  let stt = item.stt;
  addedFoods[stt] = {name: item.name, calo: item.calo, carb: item.carb, fat: item.fat, pro: item.pro}; 
  
  // innerHTML
  const list = document.getElementById("calo-list");
  const li = document.createElement("li");
  let value = item.dv === 'c' ? 1 : 100;
  li.innerHTML = `${item.name} - 
  <div class="right-group">
      <input type="number" value="${value}" class="inputcalo" oninput="updatecalo(this, ${item.stt}, ${item.calo}, ${item.carb}, ${item.fat}, ${item.pro},  '${item.dv}')"> 
      <button class="remove-btn" onclick="removeItem(this)">
      <i class="ri-close-circle-line"></i>     </button>
  </div>
  `;
  list.appendChild(li);
  showtotalcal();
}

function removeItem(button){
  const item = button.parentElement;
  const item2 = item.parentElement;
  const foodName = item2.innerText.split("-")[0].trim();
  
  item2.remove();
  checkFoods[foodName] = false;
  
  for (let i = 0; i < addedFoods.length; i++) {
    if (addedFoods[i] && addedFoods[i].name === foodName) {
      addedFoods[i] = null;
    }
  }
  
  showtotalcal();
}

function updatecalo(input, stt, calobase, carbbase, fatbase, probase, dv){
  let dvi = dv==="g" ? 100 : 1; 
  let gram = parseFloat(input.value);
  if (isNaN(gram) || gram < 0) {
    gram = 0;
    input.value = 0;
  }

  let calo = parseFloat(gram * calobase / dvi);
  addedFoods[stt].calo = calo;
  let carb = parseFloat(gram * carbbase / dvi);
  addedFoods[stt].carb = carb;
  let fat = parseFloat(gram * fatbase / dvi);
  addedFoods[stt].fat = fat;
  let pro = parseFloat(gram * probase / dvi);
  addedFoods[stt].pro = pro;
  showtotalcal();
}

function showtotalcal(){
  let totalcal = 0;
  let totalcarb = 0;
  let totalfat = 0;
  let totalpro = 0;
  for (let i = 0; i < addedFoods.length; i++)
    if (addedFoods[i]){
      totalcal += addedFoods[i].calo || 0;
      totalcarb += addedFoods[i].carb || 0;
      totalfat += addedFoods[i].fat || 0;
      totalpro += addedFoods[i].pro || 0;
    }
  document.getElementById("total-calories").innerHTML = totalcal.toFixed(0) + " calories";
  document.getElementById("modal-calo").innerHTML = totalcal.toFixed(0) + " kcal";
  document.getElementById("modal-carb").innerHTML = totalcarb.toFixed(1) + " g";
  document.getElementById("modal-fat").innerHTML = totalfat.toFixed(1) + " g";
  document.getElementById("modal-pro").innerHTML = totalpro.toFixed(1) + " g";
}

//Pop up js 
function moModal(){
  document.getElementById('myModal').style.display='flex';
  showtotalcal();
}
function dongModalNgoai(event) {
  if (event.target.classList.contains('modal')) {
    dongModal();
  }
}
function dongModal() {
  document.getElementById('myModal').style.display = 'none';
}
//Box info
function checkInputNumber(input){
  let x = input.value;
  if (x < 0 || isNaN(x))
      input.value = 0;
}
//BMI js
function tinhBMI(){
  let a = document.getElementById("age").value;
  let gt = document.getElementById("gt").value;
  let h = document.getElementById("height").value;
  let w = document.getElementById("weight").value;
  const hm = h / 100;
  // cal and show bmi
  const bmi = w/(hm * hm);
  if (isNaN(bmi)) bmi = 0; 
  document.getElementById("showbmi").innerHTML=bmi.toFixed(1);
  let tt;
  if(bmi < 18.5) tt="Gầy";
  else if(bmi < 24.9) tt = "Bình thường";
  else if(bmi < 29.9) tt = "Thừa cân";
  else if(bmi < 34.9) tt = "Béo phì- 1";
  else if(bmi < 39.9) tt = "Béo phì- 2";
  else tt = "...";
  document.getElementById("comment").innerHTML=tt;
  // cal and show bmr
  let bmr;
  if (gt === "nam")
    bmr = 13.397 * w + 4.799 * h - 5.677 * a + 88.362;
  else
    bmr = 9.247 * w + 3.098 * h - 4.330 * a + 447.593;
  let caloDt = bmr * 1.375;  
  document.getElementById("Dt").innerHTML=`${caloDt.toFixed(0)} calories/ngày`;
  let caloGn = caloDt * 0.89,
      caloTn = caloDt * 1.11,
      caloG = caloDt * 0.77,
      caloT = caloDt * 1.23,
      caloGN = caloDt * 0.55,
      caloTN = caloDt * 1.45;
  document.getElementById("Gn").innerHTML=caloGn.toFixed(0) + " calories/day";
  document.getElementById("Tn").innerHTML=caloTn.toFixed(0) + " calories/day";
  document.getElementById("G").innerHTML=caloG.toFixed(0) + " calories/day";
  document.getElementById("T").innerHTML=caloT.toFixed(0) + " calories/day";
  document.getElementById("GN").innerHTML=caloGN.toFixed(0) + " calories/day";
  document.getElementById("TN").innerHTML=caloTN.toFixed(0) + " calories/day";
}

