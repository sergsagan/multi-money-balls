import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { uid, Notify } from 'quasar'

export const useStoreEntries = defineStore("entries", () => {
  /* state */

  const entries = ref([
    {
      id: 'id1',
      name: 'Salary',
      amount: 4125.00
    },
    {
      id: 'id2',
      name: 'Rent',
      amount: -720
    },
    {
      id: 'id3',
      name: 'Phone',
      amount: -12.99
    },
    {
      id: 'id4',
      name: 'Food',
      amount: -800
    },
    {
      id: 'id5',
      name: 'Unknown',
      amount: 0
    }
  ])

  /* getters */

  const balance = computed(() => {
    return entries.value.reduce((acc, { amount }) => {
      return acc + amount
    }, 0)
  })

  /* actions */

  const addEntry = addEntryForm => {
    const newEntry = Object.assign({}, addEntryForm, {id: uid() })
    entries.value.push(newEntry)
  }

  const deleteEntry = entryId => {
    const index = entries.value.findIndex(entry => entry.id === entryId)
    entries.value.splice(index, 1)
    Notify.create({
      message: 'Entry deleted',
      position: 'top'
    })
  }

  /* returns */
  return { entries, balance, addEntry, deleteEntry }
})
