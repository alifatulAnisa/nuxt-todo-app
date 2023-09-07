import {defineStore} from 'pinia'

export const useTodoStore = defineStore(
  'TodoStore',
  {
    state: () => (
      {
        items: ref([]),
      }
    ),
    actions: {
      async retrieveItems() {
        const supabase = useSupabaseClient();
        const user = useSupabaseUser();
      
        if (user.value) {
          const { data, error } = await supabase
            .from('todolist')
            .select('*')
            .eq('user_id', user.value.id)
            .order('created_at');
          if (error) {
            console.error('Failed to retrieve items:', error);
          } else {
            this.items = data || [];
            console.log(data);
          }
        } else {
          console.error('User object or user ID is null or undefined');
        }
      },          
      async addItem(newItem) {
        const supabase = useSupabaseClient();
        const user = useSupabaseUser();
        newItem.user_id = user.value.id;
        try {
          const { data, error } = await supabase
            .from('todolist') 
            .insert([{ ...newItem, user_id: newItem.user_id }]); 
  
          if (error) {
            console.error('Failed to add item:', error);
            return;
          } 
          console.log('Item added successfully!', data);
          alert('Item added successfully!');
          this.items.push(newItem);
        } catch (error) {
          console.error('Failed to add item:', error);
        }
      },
      async updateItem(itemId, updatedData) {
        const supabase = useSupabaseClient();  
        try {
          const { data, error } = await supabase
            .from('todolist')
            .update(updatedData)
            .eq('id', itemId);
            
          if (error) {
            console.error('Failed to update item:', error);
            return;
          } 
      
          console.log('Item updated successfully!', data);
          alert('Item updated successfully!');
      
          await this.retrieveItems();
        } catch (error) {
          console.error('Failed to update item:', error);
        }
      },      
      async deleteItem(itemId) {
        const supabase = useSupabaseClient();
        try {
          const { error } = await supabase
            .from('todolist')
            .delete()
            .eq('id', itemId);

          if (error) {
            console.error('Failed to delete item:', error);
            return;
          }
          console.log('Item deleted successfully!');
          this.items = this.items.filter((item) => item.id !== itemId);
        } catch (error) {
          console.error('Failed to delete item:', error);
        }
      },        
    }
  }
)