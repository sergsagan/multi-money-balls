import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { uid, Notify } from 'quasar'

export const useStoreEntries = defineStore("entries", () => {
  /* state */

  const entries = ref([
    {
      id: 'id1',
      category: 'Salary',
      amount: 4125.00
    },
    {
      id: 'id2',
      category: 'Rent',
      amount: -720
    },
    {
      id: 'id3',
      category: 'Phone',
      amount: -12.99
    },
    {
      id: 'id4',
      category: 'Food',
      amount: -800
    },
    {
      id: 'id5',
      category: 'Unknown',
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
