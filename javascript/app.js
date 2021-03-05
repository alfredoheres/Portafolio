//Typed Efect
const typed = new Typed(`.typed`,{
    strings:[`Desarrollador Web`,`Desarrollador Frontend`],
    typeSpeed:100,
    loop:true,
    showCursor:true
});




//Menu responsive
let menuBtn=document.querySelector(".menu__btn");
let iconX=document.querySelector(".menu__btn i");
let menuResponsive=document.querySelector(".menu-responsive");
let activador=true;
menuBtn.addEventListener(`click`,(event)=>{
    iconX.classList.toggle('fa-times');
    evalActivador();
    
});
let enlaces = document.querySelectorAll('.list-container__ul li a');
enlaces.forEach((element) => {
   
    element.addEventListener('click', (event) => {
        iconX.classList.toggle('fa-times');
        activador=false;
        evalActivador();
    });
  
  });

let evalActivador=function(){
    if(activador){
        menuResponsive.style.left = '0%'; 
        menuResponsive.style.transition = '0.5s';
        
        activador = false;
    }
    else{
        activador = false;
        menuResponsive.style.left = '-100vw';

        activador = true;
    }
}
//Carousel
window.addEventListener('load', function(){
    new Glider(document.querySelector(".carousel__list"),{
        slidesToShow: 1,
        dots: '.carousel__indicators',
        draggable: false,
        arrows: {
          prev: '.carousel__previous',
          next: '.carousel__next'
        }
    });
});

// Add class "active"
let aHome = document.querySelector(".section-box a:nth-child(1)");
let aAbout = document.querySelector(".section-box a:nth-child(2)");
let aPortfolio = document.querySelector(".section-box a:nth-child(3)");
let aContact = document.querySelector(".section-box a:nth-child(4)");
let number=150;
window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if(currentScrollPos < window.innerHeight-number){ //Home
        if(aHome.classList.contains("active")==false){
            aHome.classList.add("active")
        }
        if(aAbout.classList.contains("active")==true){
            aAbout.classList.remove("active");
        }
        if(aPortfolio.classList.contains("active")==true){
            aPortfolio.classList.remove("active");
        }
        if(aContact.classList.contains("active")==true){
            aContact.classList.remove("active");
        }
    }
    else if( currentScrollPos >= window.innerHeight-number && currentScrollPos < (window.innerHeight*2)-number ){//About
        if(aAbout.classList.contains("active")==false){
            aAbout.classList.add("active")
        }
        if(aHome.classList.contains("active")==true){
            aHome.classList.remove("active");
        }
        if(aPortfolio.classList.contains("active")==true){
            aPortfolio.classList.remove("active");
        }
        if(aContact.classList.contains("active")==true){
            aContact.classList.remove("active");
        }
    }
    else if( currentScrollPos >= (window.innerHeight*2)-number && currentScrollPos < (window.innerHeight*3)-number ){//Portfolio
        if(aPortfolio.classList.contains("active")==false){
            aPortfolio.classList.add("active")
        }
        if(aAbout.classList.contains("active")==true){
            aAbout.classList.remove("active");
        }
        if(aHome.classList.contains("active")==true){
            aHome.classList.remove("active");
        }
        if(aContact.classList.contains("active")==true){
            aContact.classList.remove("active");
        }    
    }
    else if( currentScrollPos >= window.innerHeight*3-number ){//Contact
        if(aContact.classList.contains("active")==false){
            aContact.classList.add("active")
        }
        if(aAbout.classList.contains("active")==true){
            aAbout.classList.remove("active");
        }
        if(aPortfolio.classList.contains("active")==true){
            aPortfolio.classList.remove("active");
        }
        if(aHome.classList.contains("active")==true){
            aHome.classList.remove("active");
        }
    }
    // console.log(`Actual:${currentScrollPos}`);
    // console.log(`Seccion:${window.innerHeight*3-50}`);
}




// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBtk7lDdq3lCWy7h0yeaXS2y95kN_QRrsI",
    authDomain: "portfolio-form-6b930.firebaseapp.com",
    projectId: "portfolio-form-6b930",
    storageBucket: "portfolio-form-6b930.appspot.com",
    messagingSenderId: "261268413758",
    appId: "1:261268413758:web:39bb5af13d1f2ef7e4606f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//Reference contactInfocollections
let contactInfo=firebase.database().ref("infos");


// Form Contact
document.querySelector(".contact-form__inputs").addEventListener("submit",submitForm);

function submitForm(e){
    e.preventDefault();

    //get inputs values
    let name=document.querySelector(".name").value;
    let email=document.querySelector(".email").value;
    let phone=document.querySelector(".phone").value;
    let affair=document.querySelector(".affair").value;
    let text=document.querySelector(".text").value;

    // console.log(name,email,phone,affair,text)

    saveContactInfo(name,email,phone,affair,text);
    retrieveInfos()
    document.querySelector(".contact-form__inputs").reset();
    sendEmail(name,email,phone,affair,text);
}

//save info to firebase
function saveContactInfo(name,email,phone,affair,text){

    let newContactInfo=contactInfo.push();
    newContactInfo.set({
        name:name,
        email:email,
        phone:phone,
        affair:affair,
        text:text
    });
}

function retrieveInfos(){
    let ref = firebase.database().ref("infos")
    ref.on("value",gotData);
}

function gotData(data){
    let info = data.val();
    let keys = Object.keys(info);

    for(let i=0; i < keys.length; i++){
        let infoData = keys[i];
        let name=info[infoData].name;
        let email=info[infoData].email;
        let phone=info[infoData].phone;
        let affair=info[infoData].affair;
        let text=info[infoData].text;
        console.log(name,email,phone,affair,text);
    }
}


function sendEmail(name,email,phone,affair,text){
    Email.send({
        Host:"smtp.gmail.com",
        Username:"luisalfredohep@gmail.com",
        Password:"slqmemaxnbnocthy",
        To:`luisalfredoHE@outlook.com`,
        From: "luisalfredohep@gmail.com",
        Subject: `${affair} send your message`,
        Body:`${name}${phone}${email}${text}`
    }).then((message)=>alert(message));
}
