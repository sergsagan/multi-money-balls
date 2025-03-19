import { defineStore } from 'pinia'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'

export const useStoreEntries = defineStore("entries", () => {
  /* state */
  const entries = ref([
    {
      id: 'id1',
      category: 'Salary',
      amount: 4125.00,
      paid: false,
    },
    {
      id: 'id2',
      category: 'Stock income',
      amount: 100,
      paid: false,
    },
    {
      id: 'id3',
      category: 'Rent',
      amount: -600,
      paid: false,
    },
    {
      id: 'id4',
      category: 'Utility bills',
      amount: -125,
      paid: false,
    },
    {
      id: 'id5',
      category: 'Phone bill',
      amount: -13.00,
      paid: false,
    },
    {
      id: 'id6',
      category: 'Internet',
      amount: -33,
      paid: false,
    },
    {
      id: 'id7',
      category: 'Food',
      amount: -700,
      paid: false,
    },
    {
      id: 'id8',
      category: 'Car',
      amount: -400,
      paid: false,
    },
    {
      id: 'id9',
      category: 'Google payments',
      amount: -180,
      paid: false,
    },
    {
      id: 'id10',
      category: 'Unknown',
      amount: 0,
      paid: false,
    }
  ])

  watch(entries.value, () => {
    saveEntries()
  })

  const options = reactive({
    sort: false
  })

  /* getters */
  const balance = computed(() => {
    return entries.value.reduce((acc, { amount }) => {
      return acc + amount
    }, 0)
  })

  const balancePaid = computed(() => {
    return entries.value.reduce((acc, { amount, paid   }) => {
      return paid && amount < 0 ? acc + amount : acc
    }, 0)
  })

  const runningBalances = computed(() => {
    let runningBalances = []
    let currentRunningBalance = 0

    if (entries.value.length) {
      entries.value.forEach(entry => {
        let entryAmount = entry.amount ? entry.amount : 0
        currentRunningBalance = currentRunningBalance + entryAmount
        runningBalances.push(currentRunningBalance)
      })
    }
    return runningBalances
  })

  /* actions */
  const addEntry = addEntryForm => {
    const newEntry = Object.assign({}, addEntryForm, {id: uid(), paid: false })
    entries.value.push(newEntry)
  }

  const deleteEntry = entryId => {
    const index = getEntryIndexId(entryId)
    entries.value.splice(index, 1)
    removeSlideItemIfExists(entryId)
    Notify.create({
      message: 'Entry deleted',
      position: 'top'
    })
  }

  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexId(entryId)
    Object.assign(entries.value[index], updates)
  }

  const sortEnd = ({ oldIndex, newIndex }) => {
    const movedEntry = entries.value[oldIndex]
    entries.value.splice(oldIndex, 1)
    entries.value.splice(newIndex, 0, movedEntry)
  }

  const saveEntries = () => {
    LocalStorage.set('entries', entries.value)
  }

  const loadEntries = () => {
    const savedEntries = LocalStorage.getItem('entries')
    if (savedEntries) {
      Object.assign(entries.value, savedEntries)
    }
  }

  /* helpers */
  const getEntryIndexId = entryId => {
    return entries.value.findIndex(entry => entry.id === entryId)
  }

  const removeSlideItemIfExists = entryId => {
    nextTick(() => {
      const slideItem = document.querySelector(`#id-${entryId}`)
      if (slideItem) slideItem.remove()
    })
  }

  /* returns */
  return { entries, options, balance, balancePaid, runningBalances, addEntry, deleteEntry, updateEntry, sortEnd, loadEntries }
})
