import DarkMode from "./DarkMode.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import Banner from "./Banner.js";
import MessageWindow from "./MessageWindow.js";
import api from "./api.js";

console.log("app is running!");

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.searchResultSection = $target.querySelector(".SearchResult");
    
    this.isDarkMode = new DarkMode({$target});

    this.messageWindow = new MessageWindow($target);
    this.loadingMessage = "now loading...";
    this.errorMessage = msg => `에러가 발생했습니다. ${msg}. 다시 로드하려면 <b>여기</b>를 클릭하세요.`;
    this.onRandomInput = async _=> await this.onRandom(true, this.onRandomInput, false, true, false);
    this.onRandomBanner = async _=> await this.onRandom(false, this.onRandomBanner, true, true, false);
    this.onRandomScroll = async _=> await this.onRandom(false, this.onRandomScroll, false, true, true);

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword=> await this.onSearch(keyword),
      onRandom: this.onRandomInput
    });

    this.banner = new Banner({
      $target,
      onRandom: this.onRandomBanner
    });

    this.data = JSON.parse(sessionStorage.getItem("searchResult"));

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      },
      onRandom: this.onRandomScroll
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData, isRandom, isScroll) {
    this.data = nextData;
    this.searchResult.setState(nextData, isRandom, isScroll);
  }
  
  async onSearch(keyword) 
  {
    this.messageWindow.setState({title:"", message: this.loadingMessage, isVisible: true});
    const res = await api.fetchCats(keyword);
    if (res.isError)
        this.messageWindow.setState({title:"Error", message: this.errorMessage(res.data), isVisible: true, onClick: async _=> await this.onSearch(keyword)});
    else
    {
        this.setState(res.data, false, false);
        this.messageWindow.setState({isVisible: false});
      }
  }

  async onRandom(useLoading, onClick, isBanner, isRandom, isScroll) 
  {
    if (useLoading)
      this.messageWindow.setState({title:"", message: this.loadingMessage, isVisible: true});
    const res = await api.fetchRandomCats();
    if (res.isError)
        this.messageWindow.setState({title:"Error", message: this.errorMessage(res.data), isVisible: true, onClick: async _=> await onClick()});
    else
    {
      if (isBanner)
        this.banner.setState(res.data);
      else
        this.setState(res.data, isRandom, isScroll);
      if (useLoading)
        this.messageWindow.setState({isVisible: false});
    }
  }
}
