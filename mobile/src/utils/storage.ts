import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage{
    
    public tokenJwt: string | null;
    public companyExternalId: string | null;

    private static instance: Storage;
    
    private constructor(tokenJwt: string | null, companyExternalId: string | null) {
        this.tokenJwt = tokenJwt;
        this.companyExternalId = companyExternalId;
    }

    public static async getInstance(): Promise<Storage> {
        if (!Storage.instance) {
            try {
                let tokenJwt: string | null = await AsyncStorage.getItem('tokenJwt');
                let companyExternalId: string | null = await AsyncStorage.getItem('companyExternalId');
                Storage.instance = new Storage(tokenJwt, companyExternalId);   
            } catch (error) {
                console.error("Error retrieving data from AsyncStorage: ", error);
            }
        }

        return Storage.instance;
    }

    public async setItem(key: string, value: string): Promise<void> {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.error(`Erro ao salvar item ${key}:`, error);
        }
    }

    public async getItem(key: string): Promise<string | null> {
        try {
          return await AsyncStorage.getItem(key);
        } catch (error) {
          console.error(`Erro ao buscar item ${key}:`, error);
          return null;
        }
    }

    public async removeItem(key: string): Promise<void> {
        try {
          await AsyncStorage.removeItem(key);
        } catch (error) {
          console.error(`Erro ao remover item ${key}:`, error);
        }
    }
    
    public async clear(): Promise<void> {
        try {
          this.setItem("tokenJwt", "");
          this.setItem("companyExternalId", "");
          //Storage.instance = new Storage("", ""); 
          await AsyncStorage.clear();
          Storage.instance = undefined as unknown as Storage; // zera o singleton
        } catch (error) {
          console.error('Erro ao limpar o AsyncStorage:', error);
        }
    }
}