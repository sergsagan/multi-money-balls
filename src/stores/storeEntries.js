import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { uid, Notify } from 'quasar'

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
      category: 'Rent',
      amount: -720,
      paid: false,
    },
    {
      id: 'id3',
      category: 'Phone',
      amount: -12.99,
      paid: false,
    },
    {
      id: 'id4',
      category: 'Food',
      amount: -800,
      paid: false,
    },
    {
      id: 'id5',
      category: 'Unknown',
      amount: 0,
      paid: false,
    }
  ])

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
      return paid ? acc + amount : acc
    }, 0)
  })

  /* actions */

  const addEntry = addEntryForm => {
    const newEntry = Object.assign({}, addEntryForm, {id: uid(), paid: false })
    entries.value.push(newEntry)
  }

  const deleteEntry = entryId => {
    const index = getEntryIndexId(entryId)
    entries.value.splice(index, 1)
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

  /* helpers */
  const getEntryIndexId = entryId => {
    return entries.value.findIndex(entry => entry.id === entryId)
  }

  /* returns */
  return { entries, options, balance, balancePaid, addEntry, deleteEntry, updateEntry, sortEnd }
})
