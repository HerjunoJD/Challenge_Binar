class Suit {
    constructor(isStart, valuePlayer, valueCOM){
        this.isStart = isStart
        this.valuePlayer = valuePlayer
        this.valueCOM = valueCOM
    }
    //Ini adalah fungsi utama yang memulai suit
    gameStart(){
        let pilihanPlayer = document.querySelectorAll('#suitTanganPlayer div')
        for(let index = 0; index < pilihanPlayer.length; index++){
            pilihanPlayer[index].addEventListener('click', () => {
                if(!this.isStart){
                    this.isStart = true

                    if(!this.valuePlayer){
                        this.valuePlayer = index
                        console.log(index)
                        this.stylingPlayer(pilihanPlayer[index])
                    }

                    if(!this.valueCOM){
                        this.valueCOM = this.randomValue()
                        this.stylingCOM(this.valueCOM)
                    }

                    this.cekHasil(this.valuePlayer, this.valueCOM)
                    this.suitGameReset()

                }
            })
        }
    }

    //Fungsi ini untuk memberikan background kepada pilihan player
    stylingPlayer(element){
        element.style.background = '#C4C4C4'
    }

    //Fungsi ini untuk menciptakan angka random yang menjadi basis dari pilihan komputer
    randomValue(){
        let randomAngka = Math.floor(Math.random() * 3)
        return randomAngka
    }

    //Sama seperti sebelumnya, tetapi dikhususkan untuk background pilihan komputer
    stylingCOM(index){
        let elementCOM = document.querySelectorAll('#suitTanganCOM div')
        elementCOM[index].style.background = '#C4C4C4'
    }

    //Fungsi ini digunakan untuk melihat hasil suit dan mengoper hasilnya ke fungsi berikutnya
    cekHasil(Player, COM){
        let hasil = null
        if(Player == COM){
            console.log("Draw")
            hasil = 0
        } else if((Player == 0 && COM == 1)||
                  (Player == 1 && COM == 2)||
                  (Player == 2 && COM == 0)){
            console.log("COM Win")
            hasil = 1
        } else{
            console.log("Player Win")
            hasil = 2
        }
        this.stylingHasil(hasil)
    }

    //Fungsi ini digunakan untuk mengubah tulisan VS menjadi kotak yang berisikan hasil dari suit
    stylingHasil(hasil){
        if(hasil == 0){
            document.getElementById("suitDisplayHasil").style.display = "none";
            document.getElementById("suitDisplayDraw").style.display = "flex";
            document.getElementById("suitIDPembatasKotakObjek").style.paddingTop = "250px";
            document.getElementById("suitReset").style.paddingTop = "125px";
        }else if(hasil == 1){
            document.getElementById("suitDisplayHasil").style.display = "none";
            document.getElementById("suitDisplayCOMWin").style.display = "flex";
            document.getElementById("suitIDPembatasKotakObjek").style.paddingTop = "250px";
            document.getElementById("suitReset").style.paddingTop = "125px";
        }else{
            document.getElementById("suitDisplayHasil").style.display = "none";
            document.getElementById("suitDisplayPlayerWin").style.display = "flex";
            document.getElementById("suitIDPembatasKotakObjek").style.paddingTop = "250px";
            document.getElementById("suitReset").style.paddingTop = "125px";
        }
    }

    //Fungsi ini digunakan untuk mengembalikan kondisi permainan ke awal
    suitGameReset(){
        document.getElementById("suitReset").addEventListener('click', () => {
            this.isStart = false
            this.valuePlayer = null
            this.valueCOM = null
            let x = document.getElementsByClassName("suitKotakTangan");
            for(let index = 0; index < x.length; index++){
                x[index].style.background = "none";
            }
            document.getElementById("suitDisplayHasil").style.display = "block";
            document.getElementById("suitDisplayPlayerWin").style.display = "none";
            document.getElementById("suitDisplayCOMWin").style.display = "none";
            document.getElementById("suitDisplayDraw").style.display = "none";
            document.getElementById("suitIDPembatasKotakObjek").style.paddingTop = "175px";
            document.getElementById("suitReset").style.paddingTop = "25px";
        })
    }
}

//Bagian ini digunakan untuk memicu mulainya permainan suit
let game = new Suit(false, null, null)
game.gameStart()