let cities=[
    {
        arabicName:"المنوفيه",
        name:"Monufia",
    },
    {
        arabicName:"البحيرة",
        name:"Beheira",
    },
    {
        arabicName:"القاهره",
        name:"Cairo",
    },
    {
        arabicName:"الاسكندرية",
        name:"Alexandria",
    }
]
for(let city of cities){
    const content=`
    <option>${city.arabicName}</option>
    `
    document.getElementById("cities-select").innerHTML+=content
}
document.getElementById("cities-select").addEventListener("change",function(){
    document.getElementById("city-name").innerHTML=this.value
 let cityName=""
 for(let city of cities){
    if(city.arabicName==this.value){
        cityName=city.name
    }
 }
 getPrayersTimingsOfCity(cityName)
})
function getPrayersTimingsOfCity(cityName){
    let prams={
        country:"EG",
        city:cityName
    }
axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params:prams
  })
  .then(function (response) {
    const timings=response.data.data.timings;
    fillTimeForPrayer("fajr-time",timings.Fajr)
    fillTimeForPrayer("sunrize-time",timings.Sunrise)
    fillTimeForPrayer("dhurh-time",timings.Dhuhr)
    fillTimeForPrayer("asr-time",timings.Asr)
    fillTimeForPrayer("sunset-time",timings.Sunset)
    fillTimeForPrayer("isha-time",timings.Isha)

    const readableDate=response.data.data.date.readable;
    const weekDay=response.data.data.date.hijri.weekday.ar;
    const date =weekDay+" "+readableDate;
    document.getElementById("date").innerHTML=date
    console.log(weekDay+" "+readableDate)
  })
  .catch(function (error) {
    console.log(error);
  })
}
   
getPrayersTimingsOfCity("cairo") 
function fillTimeForPrayer(id,time){

    document.getElementById(id).innerHTML=time;
 }