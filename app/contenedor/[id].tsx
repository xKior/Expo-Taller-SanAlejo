import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  getContenedorById,
  getObjetosByContenedor,
  deleteObjeto,
  Contenedor,
  Objeto,
} from '@/db';

export default function ContenedorDetailScreen() {
  const { id } = useLocalSearchParams();
  const [contenedor, setContenedor] = useState<Contenedor | null>(null);
  const [objetos, setObjetos] = useState<Objeto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const contenedorId = parseInt(id as string);

  const loadData = async () => {
    const cont = await getContenedorById(contenedorId);
    setContenedor(cont);

    if (cont) {
      const objs = await getObjetosByContenedor(contenedorId);
      setObjetos(objs);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleDeleteObjeto = (id: number, nombre: string) => {
    Alert.alert('Eliminar objeto', `¿Deseas eliminar "${nombre}"?`, [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await deleteObjeto(id);
            await loadData();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el objeto');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }: { item: Objeto }) => (
    <TouchableOpacity
      style={styles.objetoItem}
      onPress={() => router.push(`editObjeto/${item.id}?contenedorId=${contenedorId}`)}
    >
      <View style={styles.objetoContent}>
        <Text style={styles.objetoName}>{item.nombre}</Text>
        <Text style={styles.objetoDesc}>{item.descripcion}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteObjeto(item.id, item.nombre)}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash" size={18} color="#ff5252" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (!contenedor) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>{contenedor.nombre}</Text>
        <Text style={styles.headerDesc}>{contenedor.descripcion}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#1f41bb" />
          <Text style={styles.headerLocation}>{contenedor.ubicacion}</Text>
        </View>
      </View>

      {/* Objetos Section */}
      <View style={styles.objektsSection}>
        <Text style={styles.sectionTitle}>Objetos en este contenedor</Text>

        {objetos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={48} color="#999" />
            <Text style={styles.emptyText}>Este contenedor está vacío</Text>
            <Text style={styles.emptySubtext}>Agrega los objetos que hay dentro</Text>
          </View>
        ) : (
          <FlatList
            data={objetos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </View>

      {/* FAB Add Object */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push(`addObjeto?contenedorId=${contenedorId}`)}
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
  headerInfo: {
    backgroundColor: '#1f41bb',
    padding: 20,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  headerDesc: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLocation: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  objektsSection: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  objetoItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },
  objetoContent: {
    flex: 1,
    marginRight: 12,
  },
  objetoName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f41bb',
    marginBottom: 4,
  },
  objetoDesc: {
    fontSize: 12,
    color: '#666',
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
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
});
