import { h, Component, Prop, Element } from "@stencil/core";
import MobileDetect from "mobile-detect";

import { Platforms } from "./platforms";

@Component({
  tag: "x-smart-app-banner",
  styleUrl: "./sab.scss",
  shadow: false,
})
export class SmartAppBanner {
  @Prop({attribute: "app-store-url"}) appStoreURL: string;
  @Prop({attribute: "play-store-url"}) playStoreURL: string;
  @Prop({attribute: "app-store-uri"}) appStoreURI: string;
  @Prop({attribute: "play-store-uri"}) playStoreURI: string;
  @Prop({attribute: 'app-store-rating'}) appStoreRating: number;
  @Prop({attribute: 'play-store-rating'}) playStoreRating: number;
  @Prop() favicon: string;
  @Prop() name: string;
  @Prop() author: string;
  @Prop() description: string;
  @Element() el: HTMLElement;
  private mobileDetect = new MobileDetect(window.navigator.userAgent);

  redirectToStore = (): void => {
    let url: string;
    let uri: string;
    switch (this.mobileDetect.os()) {
      case Platforms.ANDROID: {
        url = this.playStoreURL;
        uri = this.playStoreURI;
        break;
      }
      case Platforms.IOS: {
        url = this.appStoreURL;
        uri = this.appStoreURI;
        break;
      }
      default: url = "";
    }
    setTimeout(() => {
      window.location.href = uri;
    }, 25);
    window.location.href = url;
  }

  close = () => {
    this.el.remove();
  }

  // thanks to @epascarello: https://stackoverflow.com/a/40851134/10670707
  private renderRating() {
    const size = Math.max(0, (Math.min(5, this.appStoreRating))) * 36.5;
    console.log(size);
    return (
      <div class="smartAppBanner__info__rating">
        <span class="smartAppBanner__info__rating__star">
          <span style={{width: `${size}px`}}></span>
        </span>
      </div>
    );
  }

  render() {
    return (
      <div class="smartAppBanner">
        <span class="smartAppBanner__close" onClick={this.close}>&times;</span>
        <figure class="smartAppBanner__logo">
          <img src={this.favicon} alt="logo" />
        </figure>
        <section class="smartAppBanner__info">
          <h2 class="smartAppBanner__info__title">{this.name}</h2>
          <h3 class="smartAppBanner__info__title">{this.author}</h3>
          {this.renderRating()}
        </section>
        <section class="smartAppBanner__action">
          <button
            onClick={this.redirectToStore}
            class={this.mobileDetect.os().toLowerCase()}
          >
            Abrir
          </button>
        </section>
      </div>
    );
  }
}
