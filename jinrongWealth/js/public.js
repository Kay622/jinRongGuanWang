/*index banner_slider*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 p=2(){$(C.q).v();3 b=0,c=$(".6-s").t(),d,g=2(){3 a=2(a){$(".6-r a").R("w").7(a).Y("w")};n{5:2(b,c){X(3 d=$(".6-r"),e=0;e<b;e++)d.G("<8><a></a></8>");d.O("8","9",2(){3 b=$(V).W();a(b);c&&c(b)})},E:a}}(),h=2(){b=0==b?c.o-1:b-1;e(b)},f=2(){b=b==c.o-1?0:b+1;e(b)},e=2(a){b=a;c.P(":Q").F();c.7(a).i();g.E(a);13((a=c.7(a))&&"u"!=a.j("k-x")){3 d=a.j("k-I");a.j("k-x","u");a.J("a").K("L-M","N(\'"+d+"\')")}};n{5:2(){$(C.q).v();g.5(c.t().y(),2(a){z(d);e(a)});0<c.y()&&(e(0),d=A(f,B));$(".S-T").U(2(){$(".4-l,.4-m").i("D");z(d)},2(){$(".4-l,.4-m").F("D");d=A(f,B)});$(".4-l").9(2(){h()});$(".4-m").9(2(){f()});c.Z(":10").11();$(".6-s").i()},12:f,H:h}}();p.5();',62,66,'||function|var|arrow|init|slider|eq|li|click|||||||||fadeIn|attr|data|left|right|return|length|Slider|body|lights|imgs|children|true|width|active|ok|size|clearInterval|setInterval|5E3|document|fast|light|fadeOut|append|previous|img|find|css|background|image|url|delegate|filter|visible|removeClass|new|banner|hover|this|index|for|addClass|not|first|hide|next|if'.split('|'),0,{}))


//专家切换
var n = 1,
    w,x,l, lw;
var cont_width = 300,
    cont_height = 212,
    speed = 'slow';
var zoom_width = 102,
    zoom_height = 102;

$(document).ready(function(e) {
    lw = $('.slider ul li').outerWidth();
   // $('.slider ul li:first-child').addClass('show');
    sw = $(window).outerWidth();
    x = cont_width;
    l = $('.slider ul li').length;
    w = l * lw + (zoom_width - cont_width) + 5000;
    $('.slider ul').width(w);
});
$('.next').bind('click', function(el,ev) {
    anNext($(this),ev)
})
function anNext(obj,ev) {
    if(n==l || n > 1) {
        obj.unbind(ev);
        $('.slider ul').animate({ "left": "+="+lw+"" }, speed, function(){
            obj.click( function() {anNext(obj)})
        });
        n = n - 1;
        show(n)
    }
}
$('.prev').bind('click', function(el,ev) {
    anim($(this),ev)
})
function anim(obj,ev) {
    if(n == 1 || n < l) {
        obj.unbind(ev);
        $('.slider ul').animate({ "left": "-="+lw+"" }, speed, function(){
            obj.click( function() { anim(obj)})
        });
        n = n + 1;
        show(n);
    }
}
function show(n) {
    $('.slider ul li.show').removeClass('show');
    $('.slider ul li:nth-child('+n+')').addClass('show');
    if(n==3){
        $('.pages a.prev ').removeClass('noicon');
        $('.pages a.next ').addClass('noicon');
    } else{
        $('.pages a.next ').removeClass('noicon');
        $('.pages a.prev ').addClass('noicon');
    }
   //  $('.pages a:nth-child('+n+')').addClass('noicon');
   //
}



