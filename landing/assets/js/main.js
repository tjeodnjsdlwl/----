gsap.registerPlugin(ScrollTrigger);

// lenis
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
lenis.scrollTo(0)

// split
const headlinetitle = new SplitType('.sc-intro .headline', { types: 'words, chars', });
const textHover = new SplitType('.text-hover span', { types: 'words, chars', });
const promiseHover = new SplitType('.promise-hover span', { types: 'words, chars', });

// intro-motion
const introMotionTl = gsap.timeline({})
introMotionTl
.to('.sc-intro-motion',{
  'clip-path': 'circle(0% at 50% 50%)',
  delay:2,
  duration:1,
  ease:'circ.out',
})
.from('.sc-intro .char',{
  yPercent:100,
  stagger:{
    from:"random",
    each:0.1,
  }
})
.from('.sc-intro img',{
  scale:0,
  stagger:{
    from:"random",
    each:0.1,
  }
})

// btn-menu
const menuTl = gsap.timeline({paused:true})
menuTl
.to('.group-menu',{yPercent:'100'},'a')
.to('.group-menu .menu-item a',{yPercent:'-100',stagger:0.1,duration:0.2})
.to('.group-menu .text span',{y:'0',delay:0.1})

$('.btn-menu').click(function(){
  $(this).toggleClass('on')
  
  if($('.btn-menu').hasClass('on')){
    menuTl.play()
  }else{
    menuTl.reverse()
  }
})
$('.group-menu a').click(function(){
  $('.btn-menu').removeClass('on')
  menuTl.reverse()
})
$('.btn-contact').click(function(){
  $('html,body').scrollTop($(document).height())
})

// sc-intro
const introTl = gsap.timeline({
  scrollTrigger:{
    // markers:true,
    trigger:'.sc-project',
    start:'0 100%',
    end:'10% 0',
    scrub:true
  }
})
introTl
.to('.sc-intro',{filter:'blur(10px)',opacity:0})

// sc-project
const projectTitle = new SplitType('.sc-project .title', { types: 'words, chars', });
$('.sc-project .group-content').each(function(idx,item){
  const projectTl = gsap.timeline({
    scrollTrigger:{
      // markers:true,
      trigger:item,
      start:'0 60%',
      end:'100% 100%',
      // scrub:true
    }
  })
  projectTl
  .to($(this).find('.title .char'),{
    transform: 'translateY(0%)',
    stagger:{
      from:"random",
      each:0.1,
    }
  },'a')
  .to($(this).find('.cate span'),{transform: 'translateY(0%)'},'a')
  .to($(this).find('.link-area a'),{transform: 'translateY(0%)'},'a')

  const stickyTl = gsap.to(item,{
    scrollTrigger:{
      // markers:true,
      trigger:item,
      start:'40% 0%',
      end:'100% 0%',
      scrub:true
    },
    filter:'blur(5px)',
    '--opacity':1,
  })
})

$('.sc-project a').hover(function(){
  $('.sc-project .name').css({opacity:.5})
},function(){
  $('.sc-project .name').css({opacity:1})
})

// sc-circle
const circleTl = gsap.timeline({
  scrollTrigger:{
    // markers:true,
    trigger:'.sc-circle',
    start:'0 70%',
    end:'100% 100%',
    scrub:true,
    ease:'power1.out'
  }
})
circleTl
.from('.sc-circle .headline',{yPercent:20},'a')
.from('.sc-circle .headline span:nth-child(1)',{xPercent:10},'a')
.from('.sc-circle .headline span:nth-child(3)',{xPercent:-10},'a')
.from('.sc-circle .circle-1',{yPercent:350},'a+=0.2')

.to('.sc-circle .circle-1',{width:'250rem',height:'250rem'},'b')
.to('.sc-circle .circle-2',{width:'250rem',height:'250rem'},'b+=0.04')
.to('.sc-circle .circle-3',{width:'250rem',height:'250rem'},'b+=0.09')
.to('.sc-circle .circle-4',{width:'250rem',height:'250rem'},'b+=0.14')
.to('.sc-circle .circle-4 img',{width:'320px',height:'320px'},'b+=0.18')

// sc-promise
const promiseTl = gsap.timeline({
  scrollTrigger:{
    // markers:true,
    trigger:'.sc-promise',
    start:'0 70%',
    end:'100% 100%',
  }
})
promiseTl
.from('.sc-promise .headline span',{y:'1rem',duration:0.5},'a')
.from('.sc-promise .text span',{yPercent:100,duration:0.5},'a')

// sc-promise cursor
$(window).mousemove(function(e){
  const cursorX = e.clientX
  const cursorY = e.clientY
  gsap.to('.cursor-img',1,{
    x:cursorX,
    y:cursorY,
    // ease:"none"
  })
})
$('.promise-hover').each(function(idx,item){
  const dataName = $(item).data('img')
  $(item).hover(function(){
    $(dataName).addClass('on')
    $(this).siblings().$(dataName).removeClass('on')
  },function(){
    $(dataName).removeClass('on')
  })
})

// footer
$('.btn-scrollup').click(function(){
  window.scrollTo({
    top:0,
    behavior:'smooth'
  })
})