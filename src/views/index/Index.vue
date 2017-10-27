<template>
  <div id="app">
    <div class="container">
      <div class="account-mining-info">
        <div class="current-mining-account">
          <el-row>
            <el-col :span="5" class="text-label">
              当前账户
            </el-col>
            <el-col :span="19">
              <el-input
                placeholder="当前账户"
                icon="search"
                :on-icon-click="searchAccount"
                @change="searchAccount"
                v-model="currentAccount.address">
              </el-input>
            </el-col>
          </el-row>
        </div> <!-- // mining account -->

        <div class="mining-info-wrapper">
          <div class="account-balance">
            <el-row>
              <el-col :span="12">
                <div>
                  <div class="currency-logo">
                      <img :src="ethLogo"/>
                  </div>
                  <div class="right">
                    <div class="title">ETH</div>
                    <div class="balance">
                      {{currentAccount.ether}}
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <div class="currency-logo">
                      <img :src="bteLogo"/>
                  </div>
                  <div class="right">
                    <div class="title">BTE</div>
                    <div class="balance">
                      {{currentAccount.bter}}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div><!-- // account balance-->

          <div class="mining-info shadow">
            <div class="mining-title">挖矿详情</div>
            <div class="mining-data">
              <div class="not-mining">

              </div>

              <table class="data-list" width="100%">
                <tr>
                  <td width="33%">
                    <i class="dot"></i>Partial Attempt</td>
                  <td width="33%">每块押注</td>
                  <td width="33%">{{miningInfo.partialAttempt}} ETH</td>
                </tr>
                <tr>
                  <td><i class="dot yellow-border"></i> Left Bet</td>
                  <td>剩余押注</td>
                  <td>{{miningInfo.leftEther}} ETH</td>
                </tr>
                <tr>
                  <td><i class="dot blue-border"></i> Proift</td>
                  <td>总产出</td>
                  <td>{{miningInfo.profit}} BTE</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="mining-actions" v-if="canMine">
        <el-row :gutter="5">
          <el-col :span="12">
            <el-button class="redeem-btn">赎回</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="mining-btn">挖矿</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {default as Web3} from 'web3'
import ethLogo from './../../assets/images/ethereum.png'
import bteLogo from './../../assets/images/bitcoineum.png'
import echarts from 'echarts'

window.defaultWeb3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"))
window.defaultWeb3.currentProvider.isDefaultProvider = true

window.addEventListener('load', function() {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    // set the provider you want from Web3.providers
    window.web3 = defaultWeb3
  }
})

export default {
  components: {
  },
  data () {
    return {
      ethLogo: ethLogo,
      bteLogo: bteLogo,
      currentAccount: {
        address: '',
        ether: 0,
        bter: 0,
      },
      canMine: false,
      costChart: {},
      bteContractAddress: '0x73dD069c299A5d691E9836243BcaeC9c8C1D8734',
      bteContractABI: [{"constant":true,"inputs":[],"name":"current_external_block","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"maximumSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalWeiCommitted","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_totalBlocksMined","type":"uint256"}],"name":"calculate_base_mining_reward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"getBlockData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"address"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"lastDifficultyAdjustmentEthereumBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minimumDifficultyThresholdWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_totalWeiCommitted","type":"uint256"},{"name":"_totalWeiExpected","type":"uint256"},{"name":"_minimumDifficultyThresholdWei","type":"uint256"},{"name":"_difficultyScaleMultiplierLimit","type":"uint256"}],"name":"calculate_next_expected_wei","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MAX_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"},{"name":"_externalblock","type":"uint256"}],"name":"checkBlockMature","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"targetBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalBlocksMined","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"difficulty","type":"uint256"},{"name":"offset","type":"uint256"}],"name":"calculate_range_attempt","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"divisible_units","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkMiningActive","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"resolve_block_hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_totalBlocksMined","type":"uint256"},{"name":"_sender","type":"address"},{"name":"_blockNumber","type":"uint256"}],"name":"calculate_reward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"burnAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"blockData","outputs":[{"name":"targetDifficultyWei","type":"uint256"},{"name":"blockNumber","type":"uint256"},{"name":"totalMiningWei","type":"uint256"},{"name":"totalMiningAttempts","type":"uint256"},{"name":"currentAttemptOffset","type":"uint256"},{"name":"payed","type":"bool"},{"name":"payee","type":"address"},{"name":"isCreated","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContractState","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"initial_reward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"},{"name":"_sender","type":"address"}],"name":"checkMiningAttempt","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"targetDifficultyWei","type":"uint256"},{"name":"totalMiningWei","type":"uint256"},{"name":"value","type":"uint256"}],"name":"calculate_difficulty_attempt","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"mine","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"},{"name":"_who","type":"address"}],"name":"getMiningAttempt","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"miningAttempts","outputs":[{"name":"projectedOffset","type":"uint256"},{"name":"value","type":"uint256"},{"name":"isCreated","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"difficultyScaleMultiplierLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"blockCreationRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"currentDifficultyWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_baseReward","type":"uint256"},{"name":"_userContributionWei","type":"uint256"},{"name":"_totalCommittedWei","type":"uint256"}],"name":"calculate_proportional_reward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"},{"name":"_externalblock","type":"uint256"}],"name":"checkRedemptionWindow","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalWeiExpected","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_internal_block_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"checkWinning","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_blockNumber","type":"uint256"},{"name":"forCreditTo","type":"address"}],"name":"claim","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"difficultyAdjustmentPeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transmute","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"isBlockRedeemed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_externalBlockNum","type":"uint256"}],"name":"external_to_internal_block_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"rewardAdjustmentPeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"who","type":"address"},{"indexed":false,"name":"baseContract","type":"address"},{"indexed":false,"name":"transmutedContract","type":"address"},{"indexed":false,"name":"sourceQuantity","type":"uint256"},{"indexed":false,"name":"destQuantity","type":"uint256"}],"name":"Transmuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":true,"name":"_blockNumber","type":"uint256"},{"indexed":false,"name":"_totalMinedWei","type":"uint256"},{"indexed":false,"name":"_targetDifficultyWei","type":"uint256"}],"name":"MiningAttemptEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_info","type":"string"}],"name":"LogEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_forCreditTo","type":"address"},{"indexed":false,"name":"_reward","type":"uint256"},{"indexed":true,"name":"_blockNumber","type":"uint256"}],"name":"BlockClaimedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
      poolContractABI:[{"constant":true,"inputs":[],"name":"current_external_block","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"pool_set_ace_bank","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"remaining_epoch_blocks","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"pool_set_max_bet","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"total_mine_attempts","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"calculate_minimum_contribution","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pool_name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_paused","type":"bool"}],"name":"pool_set_paused","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_epoch","type":"uint256"}],"name":"is_epoch_passed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"divisible_units","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_mineAttempts","type":"uint256"}],"name":"calculate_epoch","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"max_bet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ace_contract_addr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bte_block_to_epoch","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"},{"name":"_sender","type":"address"}],"name":"checkMiningAttempt","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"total_attempt","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"current_epoch","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_who","type":"address"}],"name":"redeem","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"mine","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_who","type":"address"}],"name":"find_contribution","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_ace_contract_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"epoch","type":"uint256"},{"name":"mine_attempt_started","type":"uint256"},{"name":"partial_attempt","type":"uint256"},{"name":"balance","type":"uint256"},{"name":"last_redemption_epoch_balance","type":"uint256"},{"name":"last_redemption_epoch_claimed","type":"uint256"},{"name":"isCreated","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pool_version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"blockCreationRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_percentage","type":"uint8"}],"name":"pool_set_percentage","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isPaused","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_bitcoineum_contract_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_baseReward","type":"uint256"},{"name":"_userContributionWei","type":"uint256"},{"name":"_totalCommittedWei","type":"uint256"}],"name":"calculate_proportional_reward","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_epoch","type":"uint256"}],"name":"get_epoch_record","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"epochs","outputs":[{"name":"mined_blocks","type":"uint256"},{"name":"claimed_blocks","type":"uint256"},{"name":"total_claimed","type":"uint256"},{"name":"actual_attempt","type":"uint256"},{"name":"adjusted_unit","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contract_period","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_total_attempts","type":"uint256"},{"name":"_epoch_attempts","type":"uint256"}],"name":"pool_set_mining_attempts","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNum","type":"uint256"}],"name":"checkWinning","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_blockNumber","type":"uint256"},{"name":"forCreditTo","type":"address"}],"name":"claim","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"canMine","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pool_percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"max_pool_percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_who","type":"address"}],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"_externalBlockNum","type":"uint256"}],"name":"external_to_internal_block_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_info","type":"string"},{"indexed":false,"name":"_extra","type":"uint256"}],"name":"LogEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}],
      poolContractAddress: '0x60F1dfD803812b392fff0A82aac01521c07DA5a0',
      miningInfo: {
        profit: 0,
        leftEther: 0,
        totalEther: 0,
        partialAttempt: 0
      }
    }
  },
  computed: {
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    //web3 is undefined
  },
  mounted () {
    //基于准备好的dom
    var self = this
    var t = setInterval(function() {
      console.log(window.web3)
      if (window.web3) {
        clearInterval(t)
        self.loadData()
      }
    }, 1000)

    //this.renderCostChart()
    //this.init()
  },
  destroyed () {
  },
  methods: {
    getPoolInstance() {
      return window.web3.eth.contract(this.poolContractABI).at(this.poolContractAddress)
    },
    getDefaultPoolInstance() {
      return window.defaultWeb3.eth.contract(this.poolContractABI).at(this.poolContractAddress)
    },
    getBteInstance() {
      return window.defaultWeb3.eth.contract(this.bteContractABI).at(this.bteContractAddress)
    },
    init() {
      window.addEventListener('resize', function() {
        this.costChart.resize()
      }.bind(this))
    },
    renderCostChart() {
      this.costChart = echarts.init(document.querySelector('#cost-chart'));

      var option = {
          tooltip: {
              trigger: 'asix',
              axisPointer: {
                  lineStyle: {
                      color: '#ddd'
                  }
              },
              backgroundColor: 'rgba(255,255,255,1)',
              padding: [5, 10],
              textStyle: {
                  color: '#7588E4',
              },
              extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
          },
          xAxis: {
              type: 'category',
              data: [],
              boundaryGap: false,
              splitLine: {
                  show: true,
                  interval: 'auto',
                  lineStyle: {
                      color: ['#D4DFF5']
                  }
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: '#609ee9'
                  }
              },
              axisLabel: {
                  margin: 10,
                  textStyle: {
                      fontSize: 14
                  }
              }
          },
          yAxis: {
              type: 'value',
              splitLine: {
                  lineStyle: {
                      color: ['#D4DFF5']
                  }
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: '#609ee9'
                  }
              },
              axisLabel: {
                  margin: 10,
                  textStyle: {
                      fontSize: 14
                  }
              }
          },
          series: [{
              name: '今日',
              type: 'line',
              smooth: true,
              showSymbol: true,
              symbol: 'circle',
              symbolSize: 6,
              data: [],
              areaStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(199, 237, 250,0.5)'
                      }, {
                          offset: 1,
                          color: 'rgba(199, 237, 250,0.2)'
                      }], false)
                  }
              },
              itemStyle: {
                  normal: {
                      color: '#f7b851',
                      label:  {
                          "show": true,
                          "textStyle": {
                              "color": "#fff"
                          },
                          "position": "insideTop",
                          formatter: function(p) {
                              return p.value;
                          }
                      }
                  }
              },
              lineStyle: {
                  normal: {
                      width: 3
                  }
              }
          }]
        };
        let self = this
        this.$http.get('http://127.0.0.1:8010/api/bte-costs').then(response => {
            let data = response.data.data;

            for(let d of data.slice(0, 9).reverse()) {
              option.series[0].data.push(d.cost);
              option.xAxis.data.push(d.blockNumber);
            }

            self.costChart.setOption(option)
          });

    },
    loadData () {
      let self = this;
      if (!window.web3.currentProvider.isDefaultProvider) {
        //has inject web3
        this.currentAccount.address = window.web3.eth.coinbase;
        //this.canMine = true;
      } else {

      }

      this.loadAccountInfo()
    },
    loadAccountInfo () {
      let bteInstance = this.getBteInstance();
      let defaultPoolInstance = this.getDefaultPoolInstance();
      let self = this

      if (!web3.isAddress(this.currentAccount.address)) {
        return
      }

      bteInstance.balanceOf.call(this.currentAccount.address, (err, bteBalance) => {
        self.currentAccount.bter = self.toBte(bteBalance);
      });

      web3.eth.getBalance(this.currentAccount.address, (err, ethBalance) => {
        self.currentAccount.ether = web3.fromWei(ethBalance, 'ether').toFixed(5);
      });

      defaultPoolInstance.find_contribution.call(this.currentAccount.address, (err, contribution) => {
        let [a, partial_attempt, total_contribution_for_epoch, total_contribution_for_epoch_remaining, balance, f, g] = contribution;
        console.log(a, partial_attempt, total_contribution_for_epoch, total_contribution_for_epoch_remaining, balance, f, g);
        self.miningInfo.partialAttempt = web3.fromWei(partial_attempt, 'ether').toFixed(6);
        self.miningInfo.leftEther = web3.fromWei(total_contribution_for_epoch_remaining, 'ether').toFixed(6);
        self.miningInfo.profit = self.toBte(balance);
      });
    },
    toBte(value) {
      let v = parseFloat(value.dividedBy(100000000)).toFixed(5);
      return v;
    },
    searchAccount() {
      this.loadAccountInfo();
    }
  }
}
</script>
