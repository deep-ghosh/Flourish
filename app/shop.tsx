import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native";

// Define the type for garden items
interface GardenItem {
  id: string;
  name: string;
  image: string;
  url: string;
}

// Sample garden items data
const gardenItems = [
  {
    id: "1",
    name: "Aloe Vera",
    image:
      "https://i.pinimg.com/736x/2c/8c/02/2c8c02e6d6a7963cf017759bd9cc3b20.jpg",
    url: "https://plantorbit.com/products/aloe-vera-bare-rooted?variant=42197433614475&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gad_source=1&gclid=CjwKCAjwpbi4BhByEiwAMC8JnTmhMKjCjqXKg8h5HiG8fWXLhBDIULLnFHeQrv0vWdh3YTdKrgUnrxoCO5UQAvD_BwE",
  },
  {
    id: "2",
    name: "Tulsi (Holy Basil)",
    image:
      "https://i.pinimg.com/736x/b1/48/c3/b148c3f22ea173eb1c7f0ce7fb023fbb.jpg",
    url: "https://kyari.co/products/tulsi-holy-basil?currency=INR&variant=45699515121878&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=71ae23d4c1ad&tw_source=google&tw_adid=&tw_campaign=21797405936&gad_source=1&gclid=CjwKCAjwpbi4BhByEiwAMC8JnY-j3ZgfgeFHS2DKFbYFIUApJlIf7jz6YK6bhepqeE5cp4_lEcdAkhoCNX0QAvD_BwE",
  },
  {
    id: "3",
    name: "Lavender",
    image:
      "https://i.pinimg.com/736x/21/8f/20/218f20cb36b1d1f5516d880522e40f95.jpg",
    url: "https://www.prabhanjanhorticulture.com/product/lavender-plant-medicinal-plants/",
  },
  {
    id: "4",
    name: "Mint",
    image:
      "https://i.pinimg.com/736x/84/d1/ce/84d1ce8c4dbabc9d42945ac2e48a0452.jpg",
    url: "https://www.urvann.com/collection/mint-collection",
  },
  {
    id: "5",
    name: "Rosemary",
    image:
      "https://i.pinimg.com/736x/05/03/84/05038467119c5a5e8544bc2c09c0a702.jpg",
    url: "https://www.flipkart.com/amazing-gurden-rosemary-plant/p/itmd182dbbb4c3cc?pid=PSGGDZBGHQYGDKBH&lid=LSTPSGGDZBGHQYGDKBHZSOVVZ&marketplace=FLIPKART&cmpid=content_plant-sapling_21665104799_x_8965229628_gmc_pla&tgi=sem,1,G,11214002,x,,,,,,,m,,mobile,,,,,&ef_id=CjwKCAjwpbi4BhByEiwAMC8JnT2qbTV5Zc4OPipGanpkuymDABw-0MqVq0fB6Bx4rSkxw7MDSHWm_BoCR8kQAvD_BwE:G:s&s_kwcid=AL!739!3!!!!x!!&cmpid=content_21665104799_gmc_pla&gad_source=1&gclid=CjwKCAjwpbi4BhByEiwAMC8JnT2qbTV5Zc4OPipGanpkuymDABw-0MqVq0fB6Bx4rSkxw7MDSHWm_BoCR8kQAvD_BwE",
  },
  {
    id: "6",
    name: "Neem",
    image:
      "https://i.pinimg.com/736x/b0/3a/d9/b03ad97549c0a24e0dc77d8118170166.jpg",
    url: "https://www.urvann.com/collection/neem-plant",
  },
  {
    id: "7",
    name: "Eucalyptus",
    image:
      "https://i.pinimg.com/736x/0e/c5/dc/0ec5dcb11ec50f2481ce614fd2d20fa1.jpg",
    url: "https://greenparadiselive.com/products/nilgiri-eucalyptus-plant?variant=39463904936092&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gad_source=1&gclid=CjwKCAjwpbi4BhByEiwAMC8JnaDCzLbBRlG07L9vvGxrnFx2s613BOgaP8Kds6Vne6Lcmy6Oea0W6RoCkPMQAvD_BwE",
  },
  {
    id: "8",
    name: "Chamomile",
    image:
      "https://i.pinimg.com/736x/29/93/14/299314b6f997c76d28e8a5111faa7840.jpg",
    url: "https://www.amazon.in/chamomile-plant/s?k=chamomile+plant",
  },
  {
    id: "9",
    name: "Bamboo",
    image:
      "https://i.pinimg.com/736x/34/de/b0/34deb08a96b512919f32348b2fd724b2.jpg",
    url: "https://www.aravalii.com/products/2-layer-lucky-bamboo-plant?variant=42630328025282&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&utm_campaign=homedecor-Pmax-shopping&utm_source=Google&utm_medium=cpc&utm_matchtype=&utm_term=&adgroupid=&gad_source=1&gclid=CjwKCAjwpbi4BhByEiwAMC8JnY19jBUtde7DA3dUKyf1tFj_j3JlWUGkOQUTxRmNlhXT9UJ3BaGOQRoCaQUQAvD_BwE",
  },
  {
    id: "10",
    name: "Curry Leaf",
    image:
      "https://i.pinimg.com/736x/07/68/e6/0768e6a155b72230a945e2a64e7447e8.jpg",
    url: "https://urbano.in/product/curry-leaf-plant/",
  },
  {
    id: "11",
    name: "Peppermint",
    image:
      "https://i.pinimg.com/736x/dc/d0/9a/dcd09ad136d54b034082a1b1d6e1650c.jpg",
    url: "https://mybageecha.com/products/peppermint-mentha-xpiperita?currency=INR&variant=32244520321079&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=733cde4bb2cd&https://mybageecha.com/?utm_source=google&utm_medium=Pmax&utm_campaign=All_Products&device=m&campaignid=17610650329&adgroupid=&keyword=&creative=&network=x&utm_term=&gad_source=1&gclid=CjwKCAjwpbi4BhByEiwAMC8JncwupQHgMXFWSkTjGS4GNq6IeEKfrePW88BOWTTc3qwjIV5r8od3-RoCXkwQAvD_BwE",
  },
  {
    id: "12",
    name: "Cilantro",
    image:
      "https://i.pinimg.com/736x/a5/d2/8b/a5d28b2d56399fef98d418eac476ff3d.jpg",
    url: "https://www.jgbcfarms.com/edible-flowers/cilantro-suppliers-in-india",
  },
  {
    id: "13",
    name: "Thyme",
    image:
      "https://i.pinimg.com/736x/d1/20/da/d120da81c8f7849b98379fd738007124.jpg",
    url: "https://nurserynisarga.in/product/thyme-herb-plant-thymus-vulgaris/",
  },
  {
    id: "14",
    name: "Sage",
    image:
      "https://i.pinimg.com/736x/90/4f/58/904f58bac98df434176fb4a1ca00c525.jpg",
    url: "https://www.amazon.in/sage-plant/s?k=sage+plant",
  },
  {
    id: "15",
    name: "Chrysanthemum",
    image:
      "https://i.pinimg.com/736x/41/d2/57/41d2570099d4aa4185e5fea25a5fd401.jpg",
    url: "https://www.urvann.com/product/chrysanthemum-any-colour-in-4-inch-plastic-pot-1",
  },
  {
    id: "16",
    name: "Dandelion",
    image:
      "https://i.pinimg.com/736x/d6/f7/49/d6f7495d6a1f36a8874b16aaecc4ee43.jpg",
    url: "https://www.etsy.com/in-en/market/dandelion_plant",
  },
  {
    id: "17",
    name: "Orchid",
    image:
      "https://i.pinimg.com/736x/3f/f1/0c/3ff10cd2930d655a81f83b554dd5d553.jpg",
    url: "https://www.orchid-tree.com/?srsltid=AfmBOoqXIgymIRA-8lmkf222CW_B5jBy5X-jbTYs2HEzn8EiWtVDcr4a",
  },
  {
    id: "18",
    name: "Rose",
    image:
      "https://i.pinimg.com/736x/cf/36/00/cf36005b53dcefc0149b18f96752bc94.jpg",
    url: "https://nurserylive.com/collections/rose-plants",
  },
  {
    id: "19",
    name: "Lemongrass",
    image:
      "https://i.pinimg.com/736x/38/72/c4/3872c4c11937d1b6476333281594e737.jpg",
    url: "https://www.ugaoo.com/products/lemon-grass?variant=40859575189636&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&utm_source=google&utm_medium=cpc&utm_campaign=Pmax_plants&gad_source=1&gclid=CjwKCAjwpbi4BhByEiwAMC8JnVuWNzRmehSI12whV-8UU_9GLJ39NZp8JWXsw5IRz_w1Ajb1IHiniRoCzF8QAvD_BwE",
  },
  {
    id: "20",
    name: "Ficus",
    image:
      "https://i.pinimg.com/736x/7e/a1/72/7ea172c2e3d173d6f67d6d11c48def9e.jpg",
    url: "https://vermiorganics.co/products/ficus-benjamina-weeping-fig-plant?variant=48840887664920&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gad_source=1&gclid=CjwKCAjwpbi4BhByEiwAMC8JnXbPopq4d5N9nbpwZUPAlHmxLQGHmihfLZFhug-tpJn13HZ16fTHfhoCJ5YQAvD_BwE",
  },
  {
    id: "21",
    name: "Jasmine",
    image:
      "https://i.pinimg.com/736x/b8/2e/45/b82e4541685de01d061d856f935c429d.jpg",
    url: "https://www.urvann.com/collection/jasmine-plant-collection",
  },
  {
    id: "22",
    name: "Sunflower",
    image:
      "https://i.pinimg.com/736x/47/e1/ac/47e1ac8929a775c3a00ea7f84bcb1e63.jpg",
    url: "https://www.urvann.com/collection/sunflower",
  },
  {
    id: "23",
    name: "Hibiscus",
    image:
      "https://i.pinimg.com/736x/29/ca/39/29ca39d9e3c86f493a3655af8899a03e.jpg",
    url: "https://nurserylive.com/collections/hibiscus-plants",
  },
  {
    id: "24",
    name: "Daffodil",
    image:
      "https://i.pinimg.com/736x/c9/86/27/c986273bffd30b80648b6e9df985252c.jpg",
    url: "https://nurserylive.com/collections/daffodil-flower-bulbs",
  },
  {
    id: "25",
    name: "Tomato",
    image:
      "https://i.pinimg.com/736x/31/3e/88/313e885bc1b37c872d4caf59116ca13c.jpg",
    url: "https://mygreenstore.co.in/products/tomato-plant-in-6-inch-nursery-pot?srsltid=AfmBOooyrreDja5LR27cHU62B4jsfU9055SdCgb-OD-CjDPGjq_SzbXv",
  },
  {
    id: "26",
    name: "Chili Pepper",
    image:
      "https://i.pinimg.com/736x/f6/b9/5b/f6b95b747689ba7d4a394218b656b6d0.jpg",
    url: "https://www.urvann.com/collection/mirchi-chilli-plant",
  },
  {
    id: "27",
    name: "Carrot",
    image:
      "https://i.pinimg.com/736x/bd/67/61/bd676158f098967625e1c90a4e2d7a2e.jpg",
    url: "https://nurserylive.com/collections/carrot-seeds",
  },
  {
    id: "28",
    name: "Cucumber",
    image:
      "https://i.pinimg.com/736x/bb/e3/ba/bbe3ba6e0b9f5c64fa181bdd16381757.jpg",
    url: "https://www.amazon.in/cucumber-plant/s?k=cucumber+plant",
  },
  {
    id: "29",
    name: "Zucchini",
    image:
      "https://i.pinimg.com/736x/89/f8/06/89f806a982cd69a0c8dfd835889c6cd4.jpg",
    url: "https://www.etsy.com/in-en/market/zucchini_plants",
  },
  {
    id: "30",
    name: "Bell Pepper",
    image:
      "https://i.pinimg.com/736x/83/dc/96/83dc96eafc818dc8c1d43a955be7d81a.jpg",
    url: "https://www.amazon.in/bell-pepper-plant/s?k=bell+pepper+plant",
  },
];

const GardenScreen: React.FC = () => {
  // Render each garden item
  const renderItem = ({ item }: { item: GardenItem }) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/33/e2/00/33e2004db74d93c887e07d7076d46708.jpg",
      }}
      style={styles.container}
    >
      <FlatList
        data={gardenItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </ImageBackground>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 20,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#47a816", // Ensures the text is visible on the background
  },
});

export default GardenScreen;
