import '../scss/total.style.scss';

export function template(price = 0, count = 0): string {
  const template = `
  <div class="wraper-total-cart">
    <div class="total-cart">
      <h2 class="title__total-cart">Summary</h2>
      <div class="content__total-cart">
        <div class="products__total-cart">
          <span>Products: </span>
          <span class="counts__total-cart">${count}</span>
        </div>
        <div class="price-container">
          <div class="price__total-cart">
            <span>Total: </span>
            <span class="price">$${price}</span>
          </div>
        </div>
        <div class="promo__total-cart">
          <input type="search" placeholder="Promo code">
        </div>
        <p style="color: orange; text-align: center">Promo Codes: rs, dv, lal</p>
        <div class="promo-codes__total-cart">
        </div>
        <button class="btn__total-cart">BUY NOW</button>
      </div>
    </div>
  </div>
`;
  return template;
}
