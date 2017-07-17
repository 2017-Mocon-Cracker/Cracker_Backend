# Cracker_Backend

* 선린인터넷고등학교 교내 모바일 콘텐츠 경진대회 "Cracker" API DOCS

* 모든 요청 : POST , x-www-form-urlencoded 으로 처리

## DataBase Schema

> Card_Schema

    Money : {
        type: Number
    },
    CardNum : {
        type : String
    },
    Email : {
        type: String
    },
    CardName : {
        type : String
    },
    UserName : {
        type : String
    },
    CardIn : {
        type : Boolean
    },
    isEmpty : {
        type : Boolean
    },
    Paied : {
        type : Boolean
    },
    isTransfer : {
        type : Boolean
    }

> Beacon_Schema

    Station_ID : {
        type : String
    },
    Beacon_ID : {
        type : String
    },
    Time : {
        type : String
    },
    Date : {
        type : String
    },
    Bus_Num : {
        type : String
    }


## API Document

### Facebook Token Login

> /facebook/token : 페이스북 토큰 로그인
>> Requiring Params

    access_token : Facebook Token

>> Return Values

    >>> Success

        return HTTP 200, User Schema

    >>> Fail

        return HTTP 403
       
       
### Card

> /card/add : 카드 등록
>> Requiring Params

    CardName : String
    CardNum : Number
    Facebook_ID : String

>> Return Values

    >>> Success
        
        return HTTP 200
        
    >>> Fail
    
        return HTTP 403
    

