<template>
  <div class="main-page">
    <div class="uk-container uk-container-large">
      <div class="main-page__select">
        <div uk-form-custom="target: > * > span:first-child">
          <select v-model="countrySelect">
            <option v-for="(item, index) in countries" :key="index" :value="item.Slug" >{{ item.Country}}</option>
          </select>
          <button class="uk-button uk-button-default" type="button" tabindex="-1">
            <span></span>
            <span>
                    <img src="@/assets/img/arrow-down.svg" alt="">
                  </span>
          </button>
        </div>
      </div>
      <div class="uk-grid" uk-grid v-if="infoAboutCountry.length">
        <div class="uk-width-2-3@s">
          <div class="main-page__left">
            <div class="main-page__left__days">
              <div class="main-page__left__days__item" v-for="(item, index) in infoAboutCountry" :key="index">
                <div class="uk-grid uk-flex-middle" uk-grid>
                  <div class="uk-width-2-5@s">
                    <div class="main-page__left__days__item__day">
                      <p>{{ dateFormat(item.Date) }}</p>
                    </div>
                  </div>
                  <div class="uk-width-3-5@s">
                    <div class="main-page__left__days__item__about">
                      <div class="uk-grid uk-child-width-1-2@s" uk-grid>
                        <div>
                          <div class="uk-flex uk-flex-between uk-flex-middle">
                            <div class="main-page__left__days__item__about__text">
                              <p>Active</p>
                            </div>
                            <div class="main-page__left__days__item__about__num">
                              <span>{{ item.Active }}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="uk-flex uk-flex-between uk-flex-middle">
                            <div class="main-page__left__days__item__about__text">
                              <p>Deaths</p>
                            </div>
                            <div class="main-page__left__days__item__about__num">
                              <span>{{ item.Deaths }}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="uk-flex uk-flex-between uk-flex-middle">
                            <div class="main-page__left__days__item__about__text">
                              <p>Confirmed</p>
                            </div>
                            <div class="main-page__left__days__item__about__num">
                              <span>{{ item.Confirmed }}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="uk-flex uk-flex-between uk-flex-middle">
                            <div class="main-page__left__days__item__about__text">
                              <p>Recovered</p>
                            </div>
                            <div class="main-page__left__days__item__about__num">
                              <span>{{ item.Recovered }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="uk-width-1-3@s">
          <div class="main-page__right">
            <div class="main-page__right__item">
              <p class="main-page__right__item__top">Top recovered cases</p>
              <p class="main-page__right__item__center uk-position-center">{{ bestDayOfCountry.Cases }}</p>
              <p class="main-page__right__item__bottom uk-position-bottom">{{ dateFormat(bestDayOfCountry.Date) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-text-center else" v-else>No data about this country</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: "StatisticsList",
    computed: {
      ...mapGetters(['countries', 'country', 'infoAboutCountry', 'bestDayOfCountry', 'newCaseByDay']),
      countrySelect: {
        get() {
          return this.country
        },
        set(val) {

          this.getSelectedCountry(val)
          this.getCountryInfo(val)
          this.getBestDay(val)
        }
      },
    },
    mounted() {
      this.$store.dispatch('getCountriesList')
    },
    methods: {
      ...mapActions(['getSelectedCountry', 'getCountryInfo', 'getBestDay']),
      dateFormat(date) {
        const d = new Date(date)
        const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

        return (`${da} ${mo}`)
      }
    },
  }
</script>

<style lang="sass" scoped>
  $font-color: #242632
  p
    margin: 0
  .else
    color: $font-color
    font-size: 28px
    line-height: 28px
    font-weight: 500
  .main-page
    padding: 66px 0
    height: 100vh
    background: #EDF7FF
    &__select
      margin-bottom: 40px
      .uk-form-custom
        background: #fff
        border-radius: 5px
        .uk-button
          border-radius: 5px
          border: 1px solid #fff
          width: 360px
          padding: 17px 25px
          text-align: left
          font-weight: 500
          font-size: 22px
          line-height: 26px
          text-transform: none
          display: flex
          justify-content: space-between
          align-items: center
          color: $font-color
    &__left
      &__days
        &__item
          margin-bottom: 20px
          background: #fff
          padding: 20px 20px 20px 50px
          border-radius: 5px
          &:last-child
            margin-bottom: 0
          &__day
            p
              font-weight: 500
              font-size: 22px
              line-height: 26px
              color: $font-color
          &__about
            &__text
              p
                font-size: 18px
                line-height: 21px
            &__num
              span
                padding: 10px
                background: #EDF7FF
                font-weight: 700
                font-size: 18px
                line-height: 21px
                border-radius: 5px
    &__right
      &__item
        background: #1BBC9B
        padding: 40px 61px 20px
        text-align: center
        height: 450px
        position: relative
        border-radius: 5px
        p
          color: #fff
        &__top
          font-weight: 500
          font-size: 28px
          line-height: 33px
        &__center
          font-weight: 700
          font-size: 100px
          line-height: 118px
        &__bottom
          padding: 20px 0
          border-top: 1px solid rgba(255, 255, 255, 0.3)
          margin: 0 20px
          font-weight: 500
          font-size: 22px
          line-height: 25px
</style>
