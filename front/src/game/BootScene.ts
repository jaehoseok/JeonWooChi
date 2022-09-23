import { Scene } from 'phaser';
import map from './country-map.json';
import Player from './Player';

/**
 * 게임 씬(Scene) 관리 클래스
 *
 * @author Sckroll
 */
class BootScene extends Scene {
  private player!: Player;
  private checkCollide = false;

  preload() {
    // 타일맵 불러오기
    this.load.image('tiles', '/images/map/jeonwoochi-tileset.png');
    // 더미 festival atlas
    this.load.atlas(
      'festival',
      '/images/map/festivals.png',
      '/images/map/festivals_atlas.json',
    );
    this.load.tilemapTiledJSON('map', map);
    Player.preload(this);
  }

  create() {
    // 앱, 타일, 레이어 설정
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('jeonwoochi-tileset', 'tiles');
    // const festival = map
    // 타일맵 레이어를 추가할 수도 있기 때문에 tiles -> tiles1로 이름 변경
    const worldLayer = map.createLayer('tiles1', tileset, 0, 0);

    // 타일에 충돌(Collision) 적용
    worldLayer.setCollisionByProperty({ collides: true });

    // 스폰 지점 설정
    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point',
    );

    // 더미 festival 정보 생성
    const festivalInfo = map.findObject(
      'Objects',
      obj => obj.name === 'festival',
    );

    const festival = this.physics.add.staticSprite(
      festivalInfo.x || 0,
      festivalInfo.y || 0,
      'festival',
      'festival2',
    );

    // console.log(festival);

    // 플레이어 인스턴스
    this.player = new Player(
      this,
      spawnPoint.x || 0,
      spawnPoint.y || 0,
      'atlas',
      'misa-front',
    );

    // 맵 collider 설정 세팅
    this.physics.add.collider(this.player, worldLayer, (player, _) => {
      if (!player.body.checkCollision.none) {
        console.log('바다와 접촉했다');
      }
    });

    this.physics.add.collider(this.player, festival, (player, _) => {
      // 이곳이 바로 축제별 페이지를 부르는 함수를 호출하면 된다잉
      // 근데 어떻게 호출하지...
      if (!player.body.checkCollision.none) {
        console.log('축제 오브젝트와 접촉했다');
        // console.log('축제 오브젝트와 접촉했다');
        // setTimeout(() => {
        //   this.checkCollide = false;
        //   console.log('다시 false로 바귐');
        // }, 3000);
      }
    });

    // 카메라 설정
    const camera = this.cameras.main;

    camera.startFollow(this.player.me);

    // 경계 밖으로 카메라가 나가지 않도록 설정
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    this.player.update();
  }
}

export default BootScene;
