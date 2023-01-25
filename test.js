var items = ['user123', 'user234', 'user345', 'user456'];
 
var result = items.filter( function( value ) {
 
    //文字列「user234」を抽出する
    return value === 'user234';
 
})
 
console.log( result );