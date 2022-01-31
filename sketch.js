//Variáveis Globais
//VG <game elements>
var runner,runnerImg;
var street,streetImg;
var coin,coinImg;
var bomb,bombImg;
var energyDrink,EnergyDrinkImg;
var test = 22;

//função preload
function preload(){
  //imagens pré-carregadas
  runnerImg = loadAnimation("Runner-1.png","Runner-2.png");
  streetImg = loadImage("path.png");
  coinImg = loadImage("coin.png");
  bombImg = loadImage("bomb.png");
  EnergyDrinkImg = loadImage("energyDrink.png");
}

//função setup
function setup(){
  createCanvas(400,400);
  //FS <elementos do jogo>
  street = createSprite(200,200);
  runner = createSprite(200,360);
  //FS/elementos do jogo<imagem e animação>
  runner.addAnimation("running",runnerImg);
  street.addImage(streetImg);
  //FS/elementos do jogo<config do sprite>
  runner.scale = 0.05;
  street.velocityY = 20;
}

//function draw
function draw() {
//fiz uma outra maneira de fazer o corredor "colidir" com as paredes invisíveis
  runner.x = World.mouseX;
  if (runner.position.x > 300) {
    runner.position.x = 300;
  }
  if (runner.position.x <110) {
    runner.position.x = 110;
  }
  //if statment para fazer o efeito da rua se movimentando 
  if (street.y > 400) {
    street.position.y = street.position.y - 400;
  }
  //cor do plano de fundo
  background("black"); 
  //draw sprites
  drawSprites();
  //funções em loops
  createRandomPositionOfObjects();
}



function createRandomPositionOfObjects() {
  //criar moedas
   if (frameCount%100===0){ 
    coin = createSprite(200,0,10,10);
    coin.x = Math.round(random(50,350));
    coin.velocityY = street.velocityY;
    coin.addImage("moving",coinImg);
    coin.scale = 0.5;
    coin.depth = runner.depth;
    runner.depth = runner.depth + 1;
       //energyDrink
   if (frameCount%200===0){
    energyDrink = createSprite(200,0,10,10);
    energyDrink.x = Math.round(random(50,350));
    energyDrink.velocityY = street.velocityY;
    energyDrink.addImage("moving",EnergyDrinkImg);
    energyDrink.scale = 0.1;
    energyDrink.depth = runner.depth;
    runner.depth = runner.depth + 1;
      //bombs
  if (frameCount%150===0){
    bomb = createSprite(200,0,10,10);
    bomb.x = Math.round(random(50,350));
    bomb.velocityY = street.velocityY;
    bomb.addImage("moving",bombImg);
    bomb.scale = 0.1;
    bomb.depth = runner.depth;
    runner.depth = runner.depth + 1;
    //if para verificar se os objetos estão próximos demais
    if (energyDrink.x - 5 <= coin.x
      ||energyDrink.x + 5 >= coin.x) {
       console.log("test");
       coin.destroy();
    }
    if (bomb.x - 5 <= energyDrink.x
      ||bomb.x + 5 >= energyDrink.x
      ||bomb.x + 5 >= coin.x
      ||bomb.x - 5 <= coin.x) {
        bomb.destroy();
        console.log("test");
    }
   }
   }
   }

}
/*bugs quase resolvidos: as vezes(raramente) uma moeda aperece junto a 
uma bomba, o que ē injusto para o player(eu não sei como destruir sprites,porem só preciso dessa informação para resolver o bug)*/
//metas: fazer uma tabela de pontuação simples