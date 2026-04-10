import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { initializeDatabase, loadTestData } from '@/db';

export default function RootLayout() {
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initializeDatabase();
        await loadTestData();
      } catch (error) {
        console.error('Error during app initialization:', error);
      }
    };

    setupDatabase();
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'San Alejo - Inventario',
            headerTintColor: '#1f41bb',
            headerTitleStyle: { fontWeight: 'bold' }
          }} 
        />
        <Stack.Screen 
          name="contenedor/[id]" 
          options={{ 
            title: 'Detalle Contenedor',
            headerTintColor: '#1f41bb',
          }} 
        />
        <Stack.Screen 
          name="addContenedor" 
          options={{ 
            presentation: 'modal',
            title: 'Nuevo Contenedor'
          }} 
        />
        <Stack.Screen 
          name="editContenedor/[id]" 
          options={{ 
            presentation: 'modal',
            title: 'Editar Contenedor'
          }} 
        />
        <Stack.Screen 
          name="addObjeto" 
          options={{ 
            presentation: 'modal',
            title: 'Nuevo Objeto'
          }} 
        />
        <Stack.Screen 
          name="editObjeto/[id]" 
          options={{ 
            presentation: 'modal',
            title: 'Editar Objeto'
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
