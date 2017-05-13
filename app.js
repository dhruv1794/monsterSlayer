new Vue({
    el:'#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
        
    },
    methods: {
        startGame: function(){
           this.gameIsRunning=!this.gameIsRunning;
            this.playerHealth = 100;
                this.monsterHealth = 100;
            this.turns=[];
        },
        attack: function(){
           
        
            var damage= this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Player hit monster and caused damage ' + damage
            });
            if(this.checkWin()){
                return;
            }
           
             
            this.monsterAttack();
       
        },
        specialAttack: function(){
            var damage=this.calculateDamage(10,20);
            this.monsterHealth -=damage;
             this.turns.unshift({
                isPlayer:true,
                text:'Player hit monster hard and caused damage ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
            
        },
        heal: function(){
            if(this.playerHealth<90){
                this.playerHealth+=10;
                
            }else{
                this.playerHealth = 100;
            }
            
             this.turns.unshift({
                isPlayer:true,
                text:'Player healed 10 units'
            });
            this.monsterAttack();
            
        },
        giveUp: function(){
            if(confirm('looser!! are you sure??')){
                this.gameIsRunning=false;
            }
            else{
                return;
            }
        },
        monsterAttack: function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -=damage;
            this.turns.unshift({
                isPlayer:false,
                text:'Monster manages a damage on the player of ' + damage
            });
             this.checkWin();
        },
        calculateDamage: function(min,max){
            return Math.max(Math.floor(Math.random()*max) +1, min);
        },
        checkWin: function(){
             if(this.monsterHealth <= 0){
                if(confirm('you nailed it ! wanna try again??')){
                    this.startGame();
                }
                 else{
                     this.gameIsRunning=false;
                 }
                return true;
                
            }
            if(this.playerHealth <= 0){
                if(confirm('you lost! wanna take revenge ??')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            
            return false;
            
        }
        
        
    }
           
        
    
});