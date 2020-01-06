export function userReducer(state,action){
   switch(action.type){
    case "add_user":
        return {user:action.payload}
    case "remove_user":
        return {user:null}
    default:
        return state;
   }
}

export function reqReducer(state,action){
    switch(action.type){
        case "add_request":
            return [...action.payload]
        case "remove_request":
            return [];
        default:
            return state;
    }
}