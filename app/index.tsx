import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getAllContenedores, deleteContenedor, Contenedor } from '@/db';

export default function HomeScreen() {
  const [contenedores, setContenedores] = useState<Contenedor[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const isFirstLoad = useRef(true);

  const loadContenedores = async () => {
    const data = await getAllContenedores();
    setContenedores(data);
  };

  // Primera carga: esperar a que SQLite se inicialice completamente
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      // Esperar 1 segundo para que loadTestData() se complete
      const timer = setTimeout(() => {
        loadContenedores();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // En vueltas posteriores, cargar inmediatamente
      if (!isFirstLoad.current) {
        loadContenedores();
      }
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadContenedores();
    setRefreshing(false);
  };

  const handleDeleteContenedor = (id: number, nombre: string) => {
    Alert.alert(
      'Eliminar contenedor',
      `¿Deseas eliminar "${nombre}" y todos sus objetos?`,
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteContenedor(id);
              await loadContenedores();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el contenedor');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Contenedor }) => (
    <TouchableOpacity
      style={styles.containerItem}
      onPress={() => router.push(`contenedor/${item.id}`)}
    >
      <View style={styles.containerContent}>
        <Text style={styles.containerName}>{item.nombre}</Text>
        <Text style={styles.containerDesc}>{item.descripcion}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.containerLocation}>{item.ubicacion}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteContenedor(item.id, item.nombre)}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash" size={18} color="#ff5252" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {contenedores.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="box-outline" size={64} color="#999" />
          <Text style={styles.emptyText}>No hay contenedores</Text>
          <Text style={styles.emptySubtext}>
            Agrega tu primera caja, maleta o cajón
          </Text>
        </View>
      ) : (
        <FlatList
          data={contenedores}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('addContenedor')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 12,
  },
  containerItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  containerContent: {
    flex: 1,
    marginRight: 12,
  },
  containerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f41bb',
    marginBottom: 4,
  },
  containerDesc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  containerLocation: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  deleteBtn: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1f41bb',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
