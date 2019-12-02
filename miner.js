class Miner{
    constructor(){
        this.miners = [];
        this.participants = {};
    }

    insertParticipant(fee, timestamp, port){
        if(this.participants[port]==undefined){
        this.participants[port] = {fee,timestamp};
        }
        //this.miners.push(this.participants[port]);
    }

    

    sort(){
        let temp = Object.entries(this.participants);
        for(let c=0;c<temp.length;c++){
            temp[c][1] = Object.entries(temp[c][1]);
        }
        temp.sort(function(a,b){ return a[1][0][1]-b[1][0][1] || a[1][1][1]-b[1][1][1] });
        console.log(temp[0][0]+" "+temp[1][0]);
        for(let c=0;c<temp.length;c++){
            this.miners.push(temp[c][0]);
        }
    }
}
module.exports = Miner;