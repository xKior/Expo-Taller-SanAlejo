import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getObjetoById, updateObjeto, Objeto } from '@/db';

export default function EditObjetoScreen() {
  const { id, contenedorId } = useLocalSearchParams();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [objeto, setObjeto] = useState<Objeto | null>(null);
  const router = useRouter();

  const objetoId = parseInt(id as string);

  useEffect(() => {
    const loadObjeto = async () => {
      const obj = await getObjetoById(objetoId);
      if (obj) {
        setObjeto(obj);
        setNombre(obj.nombre);
        setDescripcion(obj.descripcion);
      }
    };
    loadObjeto();
  }, []);

  const handleSave = async () => {
    if (!nombre.trim() || !descripcion.trim()) {
      Alert.alert('Validación', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      await updateObjeto(objetoId, nombre, descripcion);
      Alert.alert('Éxito', 'Objeto actualizado correctamente', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el objeto');
    } finally {
      setLoading(false);
    }
  };

  if (!objeto) {
    return <View style={styles.container} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre del objeto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Cable HDMI, Camisa azul"
          placeholderTextColor="#ccc"
          value={nombre}
          onChangeText={setNombre}
          editable={!loading}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe el objeto en detalle"
          placeholderTextColor="#ccc"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!loading}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.buttonTextCancel}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton, loading && styles.disabledButton]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  textArea: {
    minHeight: 100,
    paddingVertical: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#1f41bb',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  buttonTextCancel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
