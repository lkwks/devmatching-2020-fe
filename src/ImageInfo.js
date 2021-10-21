import api from "./api.js";

export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    this.$imageInfo = $target.querySelector(".ImageInfo");
    this.data = data;

    this.catImgNode = this.$imageInfo.querySelector("img");
    this.catNameNode = this.$imageInfo.querySelector("span");
    this.catDescription = new CatDescription(this.$imageInfo.querySelector(".description"));
    
    this.$imageInfo.addEventListener('click', e=>{
	    if (e.target === this.$imageInfo || e.target.classList.contains("close"))
        this.setState({visible:false, image:null});

      if (e.target.nodeName === "B")
        this.setState(this.data); 
  	});
    
    window.addEventListener('keyup', e=>{
	    if (e.keyCode === 27)
            this.setState({visible:false, image:null});
	  });
    
    this.render();
  }

  async setState(nextData) {
    this.data = nextData;
    if (this.data.visible)
    {
      this.catDescription.setState({isLoading: true});
      this.render();
      await this.catDescription.setState({isLoading: false, id:this.data.image.id});
    }
    this.render();
  }

  fadeIn() {
    this.$imageInfo.classList.add("FadeIn");
    this.$imageInfo.classList.remove("FadeOut");
  }

  fadeOut() {
    this.$imageInfo.classList.add("FadeOut");
    this.$imageInfo.classList.remove("FadeIn");
  }

  render() {
    if (this.data.visible) 
    {
      const { id, name, url } = this.data.image;
      this.catNameNode.textContent = name;
      this.catImgNode.setAttribute("src", url);
      this.catImgNode.setAttribute("alt", name);
      this.fadeIn();
    } 
    else
      this.fadeOut();
  }
  
}


class CatDescription
{
  constructor($target)
  {
    this.$target = $target;
  }

  async setState({isLoading, id})
  {
    if (isLoading)
      this.descriptionMsg = "<li>성격: now loading...</li><li>태생: now loading...</li>";
    else
    {
      const result = await api.fetchCatInfo(id);
      if (result.isError)
          this.descriptionMsg = `${result.data}. 다시 로드하려면 <b>여기</b>를 클릭하세요.`;
      else
      {
          const { temperament, origin } = result.data; 
          this.descriptionMsg = `
              <li>성격: ${temperament}</li>
              <li>태생: ${origin}</li>`;
      }
    }
    this.render();
  }

  render()
  {
    this.$target.innerHTML = this.descriptionMsg;
  }
}