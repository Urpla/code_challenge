export type HeroInfos = {
  eyes: string;
  hair: string;
  height: string;
  weight: string;
};

class Hero {
  id: string;

  name: string;

  photo: string;

  bio: string;

  infos: HeroInfos;
}

export default Hero;
