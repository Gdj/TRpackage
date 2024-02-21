.particle1-area {position: absolute; top:50px; left: 50px; overflow: hidden;
  width: 260px; height: 380px; background-color: #333;
  .particle {
    $moveDurations: 15000 + random(4000) + s;
    position: absolute; top:-5px; left: 50%;
    animation: shoot $moveDurations ease-out infinite;
    animation-name: shoot2, fade;
    border-radius: 50%;
    background-image: radial-gradient(
    hsl(192, 100%, 80%),
    hsl(192, 100%, 80%) 10%,
    hsla(192, 100%, 80%, 0) 56%
    );
    @for $i from 0 to 20 {
    $t: (1 + .01 * random(100)) * 1s;
      &:nth-child(#{ $i + 1 }) {
        $d: random(4) + px;
        width: $d; height: $d;        
        transform: translate(random(180) - 90px, random(50)* 5px);
        animation-duration: $t;
        animation-delay: -.01 * random(100) * $t;
      }
    }
  }

  @keyframes shoot2 {
      0% { transform: translate( 50%, 0); }
  }
}          

.particle2-area { position: absolute; top:50px; left: 400px; 
  width: 230px; height: 100px; /* border: 1px solid #f00; */
  background-color: #333;
  $boxW: 150px;
  $boxH: 100px;
  $particleWidth: 5px;
  $particleNum: 20;
  $particleColor: hsl(180, 100%, 80%);
  
  .particle  {
    position: absolute; right: -10px;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    span { display: block;
    width: 100%; height: 100%;
    border-radius: 50%;
    mix-blend-mode: screen;
    background-image: radial-gradient(
        hsl(56, 100%, 80%),
        hsl(32, 100%, 80%) 10%,
        hsla(180, 100%, 80%, 0) 56%
    );

    animation: fadein-frames 200ms infinite, scale-frames 2s 1;  
    @keyframes fade-frames {
        0%   { opacity: 0; }
        15%  { opacity: 0.7; }
        40%  { opacity: 0.4; }
        70%  { opacity: 0.1; }
        100% { opacity: 0; }
    }
    @keyframes scale-frames {
        0% { transform: scale3d(0.3, 0.3, 1); }
        50% { transform: scale3d(0.2, 0.8, 1); }
        100% { transform: scale3d(0.3, 0.3, 0); }
    }
    }

    @for $i from 1 through $particleNum {
      &:nth-child(#{$i}) {
        $circleSize: random($particleWidth);
        width: $circleSize + px;
        height: $circleSize + px;

        $startPositionY: random(10) - 10;
        $framesName: "move-frames-" + $i;
        $moveDuration: 7000 + random(4000) + ms;

        animation-name: #{$framesName};
        animation-duration: $moveDuration;
        animation-delay: random(11000) + ms;

        @keyframes #{$framesName} {
          from {
              transform: translate3d(
              #{ random($boxW) - ($boxW + 50) },
              #{ $startPositionY + $boxH },
              1px
              );
              opacity: 1;
          }
          to {
              transform: translate3d(
              #{random($boxW) + 50},
              #{- $startPositionY },
              10px
              );
              opacity: 0;
          }
        }

        span {
         animation-delay: random(2000) + ms;
        }
      }
    }
  }
  
  @keyframes shoot {
      0% { transform: translate(random(50)+50px, random(100)*5px); }
  }
  @keyframes fade { 
      to { opacity: 0 } 
  }
}