import store from '../index'
import { setToken, removeToken } from '@/utils/auth/auth'
import { removeLock } from '@/utils/cache/lock'
import { login } from '@/api/system'
import { getUserInfo } from '@/api/userManager'
import { LoginParams } from '@/api/system/model'
import { UserInfo } from '@/api/userManager/model'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'

const NAME = 'user'

@Module({ name: NAME, namespaced: true, dynamic: true, store })
class User extends VuexModule {
  private user: UserInfo | null = null

  get getUserInfo (): UserInfo | null {
    return this.user
  }

  @Mutation
  commitUserInfo (userInfo: UserInfo) {
    this.user = userInfo
  }

  @Action
  getUserInfoAction () {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(res => {
          this.commitUserInfo(res.result)
        })
        .catch(e => reject(e))
    })
  }

  @Action
  login (params: LoginParams) {
    return new Promise((resolve, reject) => {
      login(params)
        .then(res => {
          setToken(res.result)
          resolve(res)
        })
        .catch(e => reject(e))
    })
  }

  @Action
  logout () {
    removeToken()
    removeLock()
  }
}

export const userStore = getModule<User>(User)
