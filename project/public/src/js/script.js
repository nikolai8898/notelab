function translit(text){
var space = '';
text = text.toLowerCase();
function TrimStr(s) {
    s = s.replace(/^-/, '');
    return s.replace(/-$/, '');
}

// Массив для транслитерации
var transl = {
'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 
'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
'#': space, '$': space, '%': space, '^': space, '&': space, '*': space, 
'(': space, ')': space,'-': space, '\=': space, '+': space, '[': space, 
']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
'{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
'?': space, '<': space, '>': space, '№':space
}
                
var result = '';
var curent_sim = '';
                
for(i=0; i < text.length; i++) {
    // Если символ найден в массиве то меняем его
    if(transl[text[i]] != undefined) {
         if(curent_sim != transl[text[i]] || curent_sim != space){
             result += transl[text[i]];
             curent_sim = transl[text[i]];
                                                        }                                                                             
    }
    // Если нет, то оставляем так как есть
    else {
        result += text[i];
        curent_sim = text[i];
    }                              
}          
                
result = TrimStr(result);               
                
return result;
    
}


$(function() {

    var view=$('.pool-list__select.select-view').val();
    if(view=='list'){
        $('.page-pools--content').addClass('list-view').removeClass('grid-view');
        $('.page-pools--list').removeClass('grid-view');
        $('.list-view').find('.page-pools--item').addClass('pool-list__item').removeClass('page-pools--item');
        $('.page-pools--list').removeClass('page-pools--list').addClass('pool-list__list');
    }
    if(view=='grid'){
    if($('.page-pools--pagination').length){
        /* REMOVE JS PAGINATION */
        $(".page-pools--pagination").jPages({
            containerID : "itemContainer",
            perPage:1000,
            midRange:1000,
            minHeight: false,
        });
        $('.page-pools--pagination.pagination').hide();
    }
        $('.page-pools--content').addClass('grid-view').removeClass('list-view');
        $('.page-pools--list').removeClass('list-view');
        $('.grid-view').find('.pool-list__item').addClass('page-pools--item').removeClass('pool-list__item');
        $('.pool-list__list').removeClass('pool-list__list').addClass('page-pools--list');
    }
    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

});
jQuery(document).ready(function(){
    jQuery('nav ul.header-menu--list, nav.top-panel-city ul.city-selector--list').superfish();
});

$(document).ready(function() {
    setNoFollow(); // Функция установки rel-nofollow для помеченных ссылок
    $('.mistake-form').find('[name=email]').attr('name', 'link').val(window.location.href);
    $('.tooltip').tooltipster();
    $('.js-pool-photos-slider').slick({
        arrows: false,
        asNavFor: '.js-pool-thumbs-slider'
    });
    $('.js-pool-thumbs-slider').slick({
        arrows: false,
        slidesToShow: 5,
        asNavFor: '.js-pool-photos-slider',
        focusOnSelect: true
    });



    initFormHandler();


    $('.survey-content').first().addClass('current');

    var lastsindex=3;
    $('a.js-survey-back').click(function () {
        $(this).removeClass('active');
        $('.survey-content').removeClass('current');
        $('.survey-content').first().addClass('current');
        $('form.form-main textarea').val('');
        $('input:checkbox').each(function () {
            $(this).prop("checked",false);
        });
        if(!$('.survey-next-click').length){
            $('.button-bottom').append('<a href="#" role="button" class="survey-next button button-orange js-survey-next survey-next-click">Продолжить</a>');
        }
    });

    $(document).on('click','.mfp-close,.mfp-content',function () {
        if(update) 
            obj_form.setAttribute('data-yaCounter',obj_form.getAttribute('data-yaCounter').split(phrase)[0]);
    });

    $(document).on('click','a.survey-next-click',function () {
        $('.survey-content').each(function () {
            if($(this).hasClass('current')){
                var getcurrent=$(this);
                getcurrent_val=getcurrent.find('input:radio:checked').val();
                getcurrent_data=getcurrent.find('input:radio:checked').attr('data-input');
            }
        });
        var questionsarray = [];
        $('.survey-questions--radio').each(function () {
            if($(this).prop("checked")){
                questionsarray.push($(this).val());
            }
        });
        if(!getcurrent_data){
            $('.button-bottom .js-survey-back').removeClass('active');
            $('html, body').animate({
                scrollTop: $("#order-sc").offset().top
            }, 1000);

            $("html, body").animate({ scrollTop: $('#order_form').offset().top }, 1000);

            setTimeout(function() {
            $('form.form-main input[name="name"]').focus();
            }, 1000);

            $(this).remove();
            $('form.form-main textarea').val(questionsarray);
            $('.button-bottom .js-survey-back').addClass('active');
        }else{
            $('.button-bottom .js-survey-back').addClass('active');
            $('.survey-content.current').removeClass('current');

            $('.survey-content').each(function () {
                if($(this).attr('data-id')==getcurrent_data){
                    $(this).addClass('current');
                }
            });
            $('form.form-main textarea').val(questionsarray);
        }
        return false;
    });
    $('.js-trainer-gallery').magnificPopup({
        type:'image',
        gallery:{
            enabled:true
        }
    });
    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        modal: true
    });
    
  //on pools leave
  var p = window.location.pathname;
  if (p.indexOf('pool') == -1 && p.indexOf('bassejny-kluba') == -1) {
    //clear filters
    localStorage['lastPagePoolmoscow'] = '1';
    localStorage['lastPagePoolmoscow1'] = '1';
    localStorage['lastPoolType'] = '';
  }
  //on pool filter view change:

    $('.page-pools--filter_param select').change(function () {
            if($('.page-pools--filter_param select#param-3').val()=='1'){
                localStorage['lastPoolType'] = '1';
                $('.page-template-tempate-swimming-pools h1.page-pools--title').text('Бассейны клуба');
            }else{
                localStorage['lastPoolType'] = '2';
                $('.page-template-tempate-swimming-pools h1.page-pools--title').text('Все бассейны');
            }
        //}
            //all
            param_1=$('select#param-1').val();  //city
            param_2=$('select#param-2').val();  //sort
            param_4=$('select#param-4').val();  //sort
            var list = '0';
            if (param_4 === 'list')
              list = '1';
            
            document.location.href = "/bassejny-kluba/?city=" + param_1 + '&sort=' + param_2 + '&all=' + list;
            param_4=$('.pool-list__select.select-view').val();
            localStorage['lastCityPool'] = param_1;
            //if(param_4!='list' || param_4=='grid'){
            //    param_3='1';
            //}else{
                param_3=$('select#param-3').val();
            $('.pools-button').removeClass('active');
            if (param_3 == '1') {
              $('#pools_club').addClass('active');
            } else {
              $('#pools_all').addClass('active');
            }
            //}
            if($(this).attr('id')=='param-3'){
            if (!param_3)  {
              $('.pool-list__select.select-view').val('list').trigger('change');
            } else {
              $('.pool-list__select.select-view').val('grid').trigger('change');
            }}
            $.ajax({
                type: 'POST',
                url: url_site+"/wp-admin/admin-ajax.php",
                data: {
                    param_1:param_1,
                    param_2:param_2,
                    param_3:param_3,
                    param_4:param_4,
                    action: 'select_pool'
                },
                success: function(data){
                    $('.page-pools--list-wrap').html(data);
                    if(param_4=='grid'){
                        $(".page-pools--pagination").jPages({
                            containerID : "itemContainer",
                            perPage:10,
                            midRange:10,
                            startPage: Number(localStorage['lastPagePool' + param_1 + param_3]) || 1,
                            minHeight: false,
                            callback: function(p) {
                              if(window.wasinit)
                                $('html, body').stop().animate({scrollTop:350}, 500, 'swing');
                              window.wasinit = true;
                              localStorage['lastPagePool' + param_1 + param_3] = p.current;
                              console.log('lastPagePool' + param_1 + param_3);
                            }
                        });
                    }
                }
            });
            return false;
    });
    //on pool page load:
    //DO NOT change city
    
    if (window.location.hash && window.location.pathname === '/bassejny-kluba/') {
      var hash = String(window.location.hash).replace('#', '');
      if (hash === 'msk')
        hash = 'moscow';
      if (hash.indexOf(',')) {
        var hash_a = hash.split(',');
        var city = hash_a[0];
        var all = hash_a[1];
        var all_val = (all === 'all' ? '1' : '0');
        if (city === 'msk')
          city = 'moscow';
        console.log('js redirect');
        document.location.href = "/bassejny-kluba/?city=" + city + '&all=' + all_val;
        if (all_val) {
          window._disable_pools_animation = true;
          $('.page-pools--filter_param select#param-1').val(city);
          $('#pools_all').trigger('click');
        } else {
          $('.page-pools--filter_param select#param-1').val(city).trigger('change');
        }
      } else {
        document.location.replace("/bassejny-kluba/?city=" + hash + '&all=0');

      }
      
    }

    $('.page-trainers--filter_select').change(function () {
        getval = $(this).val();
        var hash = getval;
        if (hash === 'moscow')
          hash = 'msk';
        document.location.hash = hash;
        $.ajax({
            type: 'POST',
            url: url_site+"/wp-admin/admin-ajax.php",
            data: {
                getval:getval,
                action: 'select_trainers'
            },
            success: function(data){
                $('.page-trainers--list').html(data);
            }
        });
        return false;
    });
  if (window.location.hash) {
    var hash = String(window.location.hash).replace('#', '');
    if (hash === 'msk')
      hash = 'moscow';
    $('.page-trainers--filter_select').val(hash).trigger('change');
  } else {
    $('.page-trainers--filter_select').trigger('change');
  }
    $('form.page-schedule--city select').change(function () {
        $getval=$(this).val();
        $('.page-schedule--pool').hide();
        $('.page-schedule--pool#'+$getval).show();
        if($getval=='none'){
            $('.page-schedule--pool').show();
        }
    });
    $('.page-schedule--tabslist a').click(function () {
        $('.page-schedule--city').hide();
        $('.page-schedule--tabslist a').removeClass('js-current');
        $(this).addClass('js-current');
        var getid=$(this).attr('id');
        $('.page-schedule--tabs .page-schedule--tab').removeClass('js-current').attr('aria-hidden', 'true');
        $('.page-schedule--tabs .page-schedule--tab#'+getid).attr('aria-hidden', 'false').addClass('js-current');
        $('.page-schedule--tabs .page-schedule--tab#'+getid).find('.page-schedule--pool').show();
        $('.page-schedule--city.'+getid+'-filter').show();
    });
    $(document).on('change','.city-selector--select', function() {
        var data_select=$(this).val();
        console.log('!!' + data_select);
        if(data_select=='gr'){
            window.location.replace('https://www.sg-mevis.de');
            return false;
        }
        if(data_select=='minsk'){
            window.location.replace('http://www.swimmer.by');
            return false;
        }
        console.log('resume redirect');
        $.ajax({
            type: 'POST',
            url: url_site+"/wp-admin/admin-ajax.php",
            data: {
                data_select:data_select,
                action: 'select_action'
            },
            success: function(data){
                if(data=='reload'){
                    window.location.replace(url_site);
                }
            }
        });
        return false;
    });
    $(document).on('click','.city-selector ul.header-submenu li a', function() {
        var data_select=$(this).attr('data-val');
        if(data_select=='gr'){
            window.location.replace('https://www.sg-mevis.de');
            return false;
        }
        if(data_select=='minsk'){
            window.location.replace('http://www.swimmer.by');
            return false;
        }
        $.ajax({
            type: 'POST',
            url: url_site+"/wp-admin/admin-ajax.php",
            data: {
                data_select:data_select,
                action: 'select_action'
            }, 
            success: function(data){
              var path = document.location.pathname;
              //wrap contacts
              var c_paths = ['/kontakty-moscow/', '/kontakty/', '/kontakty-spb/'];
              var cm_paths = {
                'moscow': c_paths[0],
                'region': c_paths[1],
                'spb': c_paths[2]
              };
              console.log('!!!' + path + data_select);
              if (c_paths.indexOf(path) !== -1)
                path = cm_paths[data_select];
              if(window.location.href == 'http://www.swimmer.ru/programmy-obucheniya/' ||
                 window.location.href == 'http://www.swimmer.ru/programmy-obucheniya/?city=moscow' ||
                 window.location.href == 'http://www.swimmer.ru/programmy-obucheniya/?city=spb' ||
                 window.location.href == 'http://www.swimmer.ru/programmy-obucheniya/?city=region'
              ) {
              if(data_select == 'moscow') window.location.replace(path); //старое
              else
              window.location.replace(path + '?city=' + data_select);  //новое
              }
              else
              window.location.replace(path); //старое
                if(data == 'reload '){
                    
                }
            }
        });
        return false;
    });
    $('form').on('submit', function(e) {
    // Старый код с целями
      var ej = $(e.currentTarget);
      var formtype = ej.find("input[name=formtype]").val();
      if (window.yaCounter32976934) {
        yaCounter32976934.reachGoal(formtype.replace('?', ''));
        yaCounter32976934.reachGoal(translit(formtype.replace('?', '')));
      }
      setTimeout(function() { ej.find('input[type=text],input[type=tel],textarea').val('');}, 50);
      $('.mfp-close-btn-in').trigger('click');
    });

    $('form.franchising-form').validate({
        rules: {
            contact:"required",
            contact_s:"required", 
            phone:"required",
            accept: "required"
        },
        errorPlacement: function() {
            return false;
        }
    });
    $('form.faq-form').validate({
        rules: {
            contact:"required",
            contact_s:"required",
            phone:"required",
            accept: "required"
        },
        errorPlacement: function() {
            return false;
        }
    });
    $('form.pool-single-form').validate({
        rules: {
            contact:"required",
            phone:"required",
            accept: "required"
        }
    });
    $('form.form-main').validate({
        rules: {
            name:"required",
            phone:"required",
            accept: "required"
        }
    });
    $('form.callback-form').validate({
        rules: {
            contact:"required",
            phone:"required",
            email:"required",
            accept: "required"
        }
    });
    $('form.vacancy-form').validate({
        rules: {
            contact:"required",
            phone:"required",
            email:"required",
            accept: "required"
        }
    });
    $('form.popup_review-form').validate({
        rules: {
            contact:"required",
            phone:"required",
            email:"required",
            accept: "required"
        }
    });
    $('form.mistake-form').validate({
        rules: {

        }
    });
    $('form.price-form').validate({
        rules: {
            contact:"required",
            phone:"required",
            email:"required",
            accept: "required"
        }
    });

    $('form.payments-form').validate({
        rules: {
            contact:"required",
            phone:"required",
            email:"required",
            accept: "required"
        }
    });
});
$(document).on('click','.page-pool-content--reviews_more', function() {
    var $this=$(this);
    if($this.prev('ul').attr('data-id')){
        var dataid=$this.prev('ul').attr('data-id');
    }
    $this.addClass('active');
    $.ajax({
        type: 'POST',
        url: url_site+"/wp-admin/admin-ajax.php",
        data: {
            dataid:dataid,
            action: 'reviews_add'
        },
        success: function(data){
            $this.removeClass('active');
            if($this.prev('ul').attr('data-id')) {
                $('.page-pool-content--reviews_list').html(data);
            }
            $this.remove();
        }
    });
    return false;
});
$(document).on('click','.page-template-template-video .page-pool-content--reviews_more', function() {
    var $this=$(this);
    var dataid=$this.parents('.page-video--content').attr('data-id');
    $this.addClass('active');
    $.ajax({
        type: 'POST',
        url: url_site+"/wp-admin/admin-ajax.php",
        data: {
            dataid:dataid,
            action: 'add_video'
        },
        success: function(data){
            $('.page-video--content').html(data);
            $this.removeClass('active');
            $this.remove();
        }
    });
    return false;
});
$(document).on('click','.page-template-template-photo .page-pool-content--reviews_more', function() {
    var $this=$(this);
    $this.addClass('active');
    $.ajax({
        type: 'POST',
        url: url_site+"/wp-admin/admin-ajax.php",
        data: {
            action: 'add_photo'
        },
        success: function(data){
            $('.page-template-template-photo .page-photo--list').html(data);
            $this.removeClass('active');
            $this.remove();
        }
    });
    return false;
});
$(document).on('click','.page-pool-content--reviews_more.single-compet', function() {
    var $this=$(this);
    var dataid=$this.prev('.page-photo--list').attr('data-id');
    $this.addClass('active');
    $.ajax({
        type: 'POST',
        url: url_site+"/wp-admin/admin-ajax.php",
        data: {
            getval: dataid,
            action: 'add_photo_compet'
        },
        success: function(data){
            $('.single-competition .page-photo--list').html(data);
            $this.removeClass('active');
            $this.remove();
            $('.js-video').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }
    });
    return false;
});

$(document).on('submit','form#form', function() {

     $form = $(this);
    var self = this;
    var str = $(this).serialize();
    console.log('FORM SUBMIT');
    $(form).find('[type="submit"]').addClass('disabled');
    $.ajax({
        type: "POST",
        url: url_site+"/wp-content/themes/mevis/send.php",
        data: str,
        success: function (data) {
            $(form).find('[type="submit"]').removeClass('disabled');
            if (data == 'sended') {
                try{
                    var target = self.getAttribute("data-yaCounter");
                    var targetUniweb = self.getAttribute("data-yaCounter-Uniweb");
                    var targetClickGA = self.getAttribute("data-ga");
                    gtag('event', 'clicksend', { 'event_category': targetClickGA, 'event_action': 'click'});
                    yaCounter32976934.reachGoal(target);
                    yaCounter49821676.reachGoal(targetUniweb);
                    console.log("отправка прошла успешно");
                }catch (e){
                    console.log(e);
                    console.log("отправка не удалась")
                }
                if (window.Swal) {
                    Swal.fire('Сообщение отправлено');
                  } else {
                      alert('Сообщение отправлено');
                  }
                // Хз что это за блок такой странный, но похоже он не рабоатет, запихнул в try
                try{
                    $('body').addClass('sended');
                    $('#sended').arcticmodal({
                        overlay: {
                            css: {
                                opacity: .9
                            }
                        }
                    });
                }catch (e) {
                    console.log(e);
                }

                function explode(){
                    $.arcticmodal('close');
                    $('body').removeClass('sended');
                }
            }
        }
    });
    return false;
});



/* BIRDS */

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


  $.birdsThreads = [];

  $.birdsCommonThread = function() {
    $.birdsThreads.forEach(function(fn) {
      fn();
    });
    requestAnimationFrame($.birdsCommonThread);
  }
  
  requestAnimationFrame($.birdsCommonThread);
 
 $.fn.birds = function(opt) {
   
   //disable animations on mobile devices
   if ($(window).width() < 1200)
    return;

   opt = opt || {};
   var delay = opt.delay || '0.0s';
   var duration = opt.duration || '0.7s';
   var from = opt.from || '30px';
   var to = opt.to || 'translateY(0px) rotateX(0deg)';
   var self = this;
   var selector = self.selector;
   var noBlink = opt.noBlink || false;
   if (noBlink === true)
    noBlink = 150;

   
  function prepareElement(e) {
    var ej = $(e); e = ej[0];
    var cs = e.style;
    //save old css
    e._original_transition = cs.transition;
    e._original_transform = cs.transform;
    e._original_zIndex = cs.zIndex;
    e._birds_animated = false;
    e._birds_prepared = true;
    e._birds_prepared_time = new Date().getTime();
    //set new animation-enter css
    ej.css({opacity: '0', 'z-index': 8, transform: 'translateY(' + from + ')', visibility: "hidden"});
  }
  
  function isBlink(e) {
    if (!noBlink)
      return false;
    var ej = $(e); e = ej[0];
    var now = new Date().getTime();
    var start = e._birds_prepared_time;
    if (start === undefined)
      return false;
    var tm = now - start;
    if (tm < noBlink)
      return true;
    return false;
  }
  
  function isElementVisible(e) {
    var ej = $(e); e = ej[0];
    if (e.getBoundingClientRect().top < $(window).height() || $(window).width() < 1279) {
      if (ej.is(':visible'))
        return true;
    }
    return false;
  }
  
  function isElementAnimated(e) {
    var ej = $(e); e = ej[0];
    if (e._birds_animated)
      return true;
    return false;
  }
  
  function animateElement(e) {
    var ej = $(e); e = ej[0];
    var handler = function() {
      e.style.transition = e._original_transition;
      e.style.transform = e._original_transform;
      e.style.zIndex= e._original_zIndex;
      e.removeEventListener('transitionend', handler);
    }
   e.addEventListener('transitionend', handler, false);
   e.style.transition = "all " + duration + " ease-out " + delay;
   e._birds_animated = true;
   setTimeout(function(){
    e.style.transform = to;
    e.style.opacity = '1';
    e.style.visibility = 'initial';
   }, 20);
  }
  
  function prepareElements(els) {
    $(els).each(function(i, e) {
      if (e._birds_prepared || e._birds_animated)
        return;
      prepareElement(e);
    });
  }
  
  function animateElements(els) {
    $(els).each(function(i, e) {
      if (!e._birds_prepared || isElementAnimated(e) || !isElementVisible(e))
        return;
      if (isBlink(e))
        return;
      animateElement(e);
    });
  }
  
  function mainThread() {
    var els = $(selector);
    //wait for new elements and prepare all elements by selector
    prepareElements(els);
    //animate all elements by selector
    animateElements(els);
  }
  
  function init() {
    $.birdsThreads.push(mainThread.bind(this));
  }
   
   init();
   return this;
 } 
  //.story__text>p,
  $(".page-trainers--item:not(.original)").birds({noBlink: 150});
  //$(".page-pools--item").birds({noBlink: 1150});
  //$(".pool-list__item").birds({noBlink: 150});
  $(".page-photo--item, .page-competition--result, .page-competition--result_table td, .page-competition--tabslist").birds();

  $(".page-franchising--form, .page-franchising--title, .page-franchising--header_text").birds({delay: '0.2s'});
  $(".page-trainer--content_info, .page-trainer--photo, .page-trainer--content_about, .page-trainer--pool").birds({delay: '0.1s'});
  $(".page-franchising--step, .page-franchising--advantage, .page-certificates--content").birds({delay: '0.5s'});

 $(".page-mission--title, .page-mission--text>p, .page-mission--target, .page-mission--philosophy, .about-videos").birds({delay: '0.3s'});
 $(".header-actions--banner_title").birds({delay: '0.6s'});
 $(".page-vacancies--possibility_post, .page-vacancies--possibility_desc, .page-photo--item_info").birds({delay: '0.5s'});
 $('.page-vacancies--vacancy, .page-vacancies--possibilities_title, .page-vacancies--possibility_icon, .gallery, .club-title, .club-text').birds();
$('.page-garancy--header, .page-garancy--content_text, .page-garancy--content_images').birds();
$('.about-title, .order-content, .club.block, .footer-top, .page-pool-content--text, .page-pool-content--photos').birds();
$('.page-certificates--content_text, .page-certificates--certificate, .page-certificates--about_text, .page-certificates--about_img, .story__text>p, .place__title').birds();

$('.header-menu, .header-logo, footer, .order-form, .about-content, .advantages.block, .about-content--video .top-panel>*, .why-video--img').birds();
$('.dreams-decor, .dreams-title, .dreams-button, .survey.block').birds();
$('.page-programs--item').birds();
$('.page-cat-a--item, .page-program--item, .page-cat-b--item, .page-search--item, .page-course p, .page-course ul, .page-course li, .page-course h3, .x-page-pool-content--review, .page-schedule--pool, .page-a--rightcol p, .page-b--rightcol p, .commons__item, .place p, .place h3, .place img, .place li, .tabs__caption, .page-faq--single').birds({delay: '0.3s'});
$('.page-prices--price').birds({delay: '0.5s'});
$('.footer-menu').birds({delay: '0.5s'});
$('.about-content--text').birds();
$('.header-actions--slider, .header-actions--list').birds({delay: '0.5s', duration: '0.6s', xto: 'translateX(-0%) translateY(0px)'});
// $("p,h1,h2,h3,h4,h5,h6 .bgimage").birds();

// Функция инициализации обработчика форм c модальными окнами и  поддержкой яндекс целей
function genFormHandler(e) {
    console.log('genFormHandler');
        if (e._formHandler) {
            console.log('genFormHandler->exists');
            return;
        }
        var formWrapperId = e.getAttribute("data-link-form-container");
        var form = document.getElementById(formWrapperId).querySelector("form");
        if (e.hasAttribute("data-yaID")) {
            var yaID= e.getAttribute("data-yaID");
            form.setAttribute('data-yaCounter',form.getAttribute('data-yaCounter')+yaID);
            update=true;
            phrase=yaID;
            obj_form=form;
        }
        else update=false;
        if (e.hasAttribute("data-yaID-form")) {
          var yaID= e.getAttribute("data-yaID-form");
          form.setAttribute('data-yaCounter',yaID);
          update=true;
          phrase=yaID;
          obj_form=form;
        }

        //Отслеживаем нажатие кнопки для яндекс целей
        try{
            var targetClick = e.getAttribute("data-yaCounter");
            var targetClickUniweb = e.getAttribute("data-yaCounter-Uniweb");
            var targetClickGA = e.getAttribute("data-ga");
            gtag('event', 'clicksend', { 'event_category': targetClickGA, 'event_action': 'click'});
            yaCounter32976934.reachGoal(targetClick);
            yaCounter49821676.reachGoal(targetClickUniweb);
            console.log("клик обработан");
        }catch (e) {
            console.log("Не установленна цель на кнопку");
            console.log(e);
        }

        try{
            var targetSend = form.getAttribute("data-yaCounter");
        }catch (e){
            console.log("Не установленна цель на форму");
            console.log(e);
            targetSend = null;
        }
        var handlerPopUpForm = new FormHandler(form,targetSend,e);
        e._formHandler = handlerPopUpForm;
        console.log(handlerPopUpForm);

}



// Функция инциализует создания объектов-обработчиков формы
function initFormHandler() {

    var arrForm = document.querySelectorAll("form[data-form-handler]");
    var i;
    var length = arrForm.length;

    for(i = 0; i < length; i++){
      new DefaultFormHandler(arrForm[i]);
    }

}





function setNoFollow(){
    try{
        var container = document.querySelector("[data-rel-nofollow");
        var link = container.querySelector("a");
        link.setAttribute("rel","nofollow");
    }catch (e){

    }

}
$( document ).ready(function() {
  $(window).scroll(function () {
    // плавающая шапка
    if ($(this).scrollTop() > 100) {
      $('.top-panel').addClass("sticky-head");
      $('#toTop').fadeIn();
    }
    else {
      $('.top-panel').removeClass("sticky-head");
      $('#toTop').fadeOut();
    }
  });
  $('#toTop').click(function() {
    $('body,html').animate({scrollTop:0},800);
  });
});