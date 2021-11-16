import {action,runInAction, makeAutoObservable} from 'mobx';
import axios from 'axios';

type Users={
    username:string;
    plan:string;
    id:number;
    changingPlan?:boolean;
    isPlanChanged?:boolean;
}[] | [];

type ResponseUserType={
    username:string;
    subscription:{
    plan:string;
    }
    id:number;
}
type ResponseUserDataType={
    data:ResponseUserType[]
}

export class UsersStore {
    constructor() {
        makeAutoObservable(this);
    }
    
     users:Users=[];
     loadingUser= false;
     searchText="";
     fName="";
     dob:Date | null =null;
     selectedPlan="";
     searchResult:Users=[];
     error="";
     planData:string[]=[];

    @action getUserData(){
        this.setLoading(true);
        axios.get("https://random-data-api.com//api/users/random_user?size=30")
        .then(({data}: { data: ResponseUserType[]})=>{
            console.log(data);
            runInAction(() => {
                const localStorageUserData = localStorage.getItem("user");
                const parsedUserData = localStorageUserData ? JSON.parse(localStorageUserData) : []
                this.users = this.searchResult = this.filterUserData(data).concat(parsedUserData);
            })
            this.setLoading(false);
        })

    }

    @action setLoading(state:boolean){
           this.loadingUser=state
    }

    @action filterUserData(data: ResponseUserType[]) {
        return data.map((item:ResponseUserType)=>{
                return {
                    username:item.username,
                    plan:item.subscription.plan,
                    id:item.id
                }
            });
    }
    @action changeUserSubscriptionPlan = (userid:number) => {
        this.setChangingData(true,userid);
        setTimeout(()=>{
        //   const currentUser=this.users.filter(item=>{
        //         return item.id==userid;         
        //     })
        //     console.log(currentUser)
        //  const changeData = this.users.filter(item=>item.id===userid).plan="ultra" 
        
        const changeData=this.users.filter(item=>item.id===userid).forEach(item=>item.plan="Ultra")
        console.log(changeData);
        this.setChangingData(false,userid);
        this.setIsPlanChanged(true,userid);
        },600);
    }
    @action setChangingData(state:boolean,userid:number){
        this.users.filter(item=>item.id===userid).forEach(item=>item.changingPlan=state);
    }

    @action setIsPlanChanged(state:boolean,userid:number){
        this.users.filter(item=>item.id===userid).forEach(item=>item.isPlanChanged=state);
    }

    @action changeAllUsersSubscriptionPlan=()=>{
        const unChangedPlanUser=this.users.filter((item)=> !item.isPlanChanged).slice(0,5);

        unChangedPlanUser.forEach(item=>{
            this.changeUserSubscriptionPlan(item.id);
        })
    }

    @action setSearchText=(val:string)=>{
        this.searchText=val;
    }

    @action getFilterUsers=()=>{
      this.searchResult =   this.users.filter((item)=>{
        return item.username.search(this.searchText)!== -1;
        })
    }

    @action setFname=(name:string)=>{
        this.fName=name;

    }
    @action setDob=(date:Date | null)=>{
        this.dob=date;
    }

    @action setPlan=(planValue:string)=>{
        this.selectedPlan=planValue;
    }

    @action errorForm=(value:string)=>{
        this.error=value
    }

    @action setUsersPlan=()=>{
        this.planData=["Essesntial","Premium","Platinium","Basic","Gold","Diamond","FreeTrial",
        "Bussiness","Standard","Student","Bronze","Starter"];
    }


}

const store=new UsersStore();

export default store;
