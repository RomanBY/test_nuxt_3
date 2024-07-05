export default class Model<T extends object> {
  protected initialData!: T

  constructor (protected data: T) {
    this.initialData = Object.assign({}, data)
    this.setData(data)
  }

  protected setData (data: T) {
    this.data = data
  }

  public get<K extends keyof T> (key: K): T[K] {
    return this.data[key]
  }

  public set<K extends keyof T, M extends T[K]> (key: K, value: M) {
    return this.data[key] = value
  }

  public isDirty (key: keyof T | null = null) {
    if (key) {
      return this.get(key) !== this.initialData[key]
    }
    return Object.keys(this.initialData).some((key, _index, _arr) => {
      return this.get(key as keyof T) !== this.initialData[key as keyof T]
    })
  }

  public toRequest () {
    return this.data
  }

  public fresh () {
    this.setData(this.initialData)
    return this
  }
}
