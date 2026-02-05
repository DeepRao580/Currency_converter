// const URL= "https://catfact.ninja/facts";

// const getFacts = async ()=>{
//     console.log("Getting Data...");
//     let response = await fetch(URL);
//     console.log(response); //JSON Response
//     let data= await response.json();
//     console.log(data);
//     console.log(data.data[0].fact);
// }
// getFacts();

//CURRENCY CONVERTER

const Base = "INR";
const URL = `https://open.er-api.com/v6/latest/${Base}`;

const from_select= document.querySelector('select[name="from"]');
const to_select= document.querySelector('select[name="to"]');
const from_image= document.querySelector(".fromimg");
const to_image= document.querySelector(".toimg");
const mess= document.querySelector(".message");
const input = document.querySelector('.amount input');
const reverse= document.querySelector(".into");
const know_rate=document.querySelector(".exc");

let allRates={};
const getrate= async ()=>{
    let response= await fetch(URL);
    let data= await response.json();
    allRates= data.rates;
    // console.log(allRates);
    // console.log(Object.keys(allRates));
    // console.log(Object.values(allRates));
    pulldown();
};
getrate();

let pulldown= ()=>{
    for(let code in allRates){
        from_select.innerHTML+= `<Option value="${code}">${code}</Option>`;
        to_select.innerHTML+= `<Option value="${code}">${code}</Option>`;
    }
    from_select.value="USD";
    to_select.value="INR";
}
let change_Image= ()=>{
    let codef=from_select.value;
    let codet=to_select.value;
    let countryf= countryList[codef];
    let countryt=countryList[codet];
    from_image.src=`https://flagsapi.com/${countryf}/flat/64.png`;
    to_image.src=`https://flagsapi.com/${countryt}/flat/64.png`;
}

from_select.addEventListener("change",change_Image);
to_select.addEventListener("change", change_Image);

reverse.addEventListener("click", ()=>{
    let temp= from_select.value;
    from_select.value= to_select.value;
    to_select.value=temp;
    change_Image();
})

function calc_rate(){
    let value= input.value.trim();
    let amount=Number(input.value);
    if(value ===""){
        mess.innerHTML="Please write the amount!!";
        mess.style.display="block";
        return;
    }
    else if(isNaN(amount)){
        mess.innerHTML="Invalid Input!! Input must be a Number!!";
        mess.style.display="block";
        return;
    }
    else{
        let result=(amount)/(allRates[from_select.value]) * (allRates[to_select.value]);
        mess.innerHTML=`${amount} ${from_select.value} = ${result.toFixed(3)} ${to_select.value}`;
        mess.style.display="block";
    }

    input.innerHTML= "";
}

know_rate.addEventListener("click", calc_rate);
input.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        e.preventDefault(); // prevents submitting of the form
        calc_rate();
    }
})