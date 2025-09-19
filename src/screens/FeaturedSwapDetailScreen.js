import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';

const { width } = Dimensions.get('window');

const swapArticles = [
    {
        id: 1,
        title: 'The Art of Skill Exchange: Building Meaningful Connections',
        excerpt: 'Discover how skill swapping creates lasting relationships and mutual growth in our community.',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
        content: `Skill swapping is more than just exchanging knowledge – it's about building meaningful connections that last a lifetime. When we share our expertise with others, we create bonds that go beyond the classroom or workshop setting.

Research shows that peer-to-peer learning is one of the most effective ways to acquire new skills. Unlike traditional education, skill swapping allows for personalized, flexible learning that adapts to your schedule and learning style.

In our community, we've seen incredible transformations. Take Sarah, who traded her photography skills for cooking lessons. Not only did she learn to make amazing Bengali dishes, but she also gained a lifelong friend and cooking partner.

The key to successful skill swapping is finding the right match. Look for someone whose teaching style complements your learning preferences, and don't be afraid to communicate your goals and expectations clearly.

Remember, every expert was once a beginner. Be patient with yourself and your swap partner as you both navigate this learning journey together.`
    },
    {
        id: 2,
        title: 'Success Stories: How Skill Swapping Changed Lives',
        excerpt: 'Real stories from our community members who transformed their careers through skill exchange.',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop',
        content: `Meet Ahmed, a software developer who always dreamed of playing guitar. Through our platform, he connected with Maria, a professional musician who wanted to learn web development.

"I never thought I could afford music lessons," Ahmed shares. "But through skill swapping, I not only learned guitar but also helped Maria build her first website for her music business."

Their story is just one of many. Here are more inspiring transformations:

**Fatima's Journey**: A homemaker who traded her exceptional cooking skills for English lessons. Today, she runs a successful catering business and communicates confidently with international clients.

**Karim's Transformation**: An accountant who swapped his financial expertise for fitness training. He lost 30 pounds and now helps others manage both their finances and health.

**Nadia's Success**: A teacher who exchanged her tutoring skills for photography lessons. She now runs a side business photographing weddings and events.

These stories prove that skill swapping isn't just about learning – it's about unlocking potential you never knew you had. The confidence gained from mastering a new skill often spills over into other areas of life, creating positive changes that extend far beyond the original swap.

What skill will you swap next?`
    },
    {
        id: 3,
        title: 'Tips for Effective Skill Swapping',
        excerpt: 'Expert advice on how to make the most of your skill exchange experience.',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
        content: `Getting the most out of your skill swap requires preparation and the right mindset. Here are proven strategies from our most successful community members:

**1. Set Clear Goals**
Before starting any swap, define what you want to achieve. Are you looking to master basics or advance existing skills? Clear goals help both parties stay focused.

**2. Create a Learning Schedule**
Consistency is key. Set regular meeting times and stick to them. Even 30 minutes twice a week can lead to significant progress over time.

**3. Prepare Materials in Advance**
Whether you're teaching or learning, come prepared. Have your questions ready, bring necessary materials, and create a comfortable learning environment.

**4. Practice Active Communication**
Don't hesitate to ask questions or request clarification. Good communication ensures both parties get maximum value from the exchange.

**5. Document Your Progress**
Keep a learning journal or take photos/videos of your progress. This helps track improvement and provides motivation during challenging moments.

**6. Be Patient and Supportive**
Remember that everyone learns at their own pace. Celebrate small victories and provide encouragement when challenges arise.

**7. Exchange Feedback Regularly**
Regular check-ins help improve the teaching and learning process. Honest, constructive feedback benefits everyone involved.

**8. Build a Relationship**
The best skill swaps often lead to lasting friendships. Take time to get to know your swap partner beyond just the skills being exchanged.

Follow these tips, and you'll find that skill swapping becomes not just educational, but truly transformational.`
    }
];

export default function FeaturedSwapDetailScreen({ route, navigation }) {
    const { swap } = route.params || {};
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleContactTeacher = () => {
        Alert.alert(
            'Contact Teacher',
            `Would you like to send a message to ${swap?.teacher}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Send Message', onPress: () => navigation.navigate('Messages') }
            ]
        );
    };

    const handleJoinSwap = () => {
        Alert.alert(
            'Join Skill Swap',
            `Are you interested in joining "${swap?.title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes, Join!', onPress: () => Alert.alert('Success', 'Your interest has been registered!') }
            ]
        );
    };

    const renderArticleModal = () => {
        if (!selectedArticle) return null;

        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                        <TouchableOpacity
                            onPress={() => setSelectedArticle(null)}
                            style={styles.closeButton}
                        >
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.modalBody}>
                        <Image source={{ uri: selectedArticle.image }} style={styles.modalImage} />
                        <View style={styles.modalMeta}>
                            <Text style={styles.readTime}>{selectedArticle.readTime}</Text>
                        </View>
                        <Text style={styles.articleContent}>{selectedArticle.content}</Text>
                    </ScrollView>
                </View>
            </View>
        );
    };

    if (!swap) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Swap details not found</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Featured Swap</Text>
                    <TouchableOpacity style={styles.shareBtn}>
                        <Ionicons name="share-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Swap Image */}
                <Image source={{ uri: swap.image }} style={styles.swapImage} />

                {/* Badge */}
                <View style={styles.badgeContainer}>
                    <Text style={[styles.badge, { backgroundColor: swap.badgeColor }]}>
                        {swap.badge}
                    </Text>
                </View>

                {/* Swap Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.swapTitle}>{swap.title}</Text>

                    {/* Teacher Info */}
                    <View style={styles.teacherSection}>
                        <Avatar name={swap.teacher} size={60} />
                        <View style={styles.teacherInfo}>
                            <Text style={styles.teacherName}>{swap.teacher}</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.rating}>{swap.rating}</Text>
                                <Text style={styles.reviews}>({swap.reviews} reviews)</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Swap Exchange */}
                    <View style={styles.exchangeSection}>
                        <Text style={styles.sectionTitle}>Skill Exchange</Text>
                        <View style={styles.exchangeContainer}>
                            <View style={styles.skillBox}>
                                <Text style={styles.skillLabel}>Teaching</Text>
                                <Text style={styles.skillName}>{swap.teacherSkill}</Text>
                            </View>
                            <Ionicons name="swap-horizontal" size={24} color="#4CAF50" style={styles.swapIcon} />
                            <View style={styles.skillBox}>
                                <Text style={styles.skillLabel}>Looking for</Text>
                                <Text style={styles.skillName}>{swap.wantedSkill}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>About This Swap</Text>
                        <Text style={styles.description}>
                            Join this exciting skill exchange where you can learn {swap.wantedSkill} while sharing your knowledge of {swap.teacherSkill}.
                            This is a perfect opportunity for mutual learning and building lasting connections in our community.

                            {'\n\n'}Our experienced teacher {swap.teacher} has been highly rated by the community and offers flexible scheduling
                            to accommodate your learning needs. Whether you're a beginner or looking to advance your skills, this swap is designed
                            to provide value for learners at all levels.
                        </Text>
                    </View>

                    {/* Articles Section */}
                    <View style={styles.articlesSection}>
                        <Text style={styles.sectionTitle}>Related Articles</Text>
                        {swapArticles.map((article) => (
                            <TouchableOpacity
                                key={article.id}
                                style={styles.articleCard}
                                onPress={() => setSelectedArticle(article)}
                            >
                                <Image source={{ uri: article.image }} style={styles.articleImage} />
                                <View style={styles.articleContent}>
                                    <Text style={styles.articleTitle}>{article.title}</Text>
                                    <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
                                    <Text style={styles.articleReadTime}>{article.readTime}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.contactButton} onPress={handleContactTeacher}>
                            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
                            <Text style={styles.contactButtonText}>Contact Teacher</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.joinButton} onPress={handleJoinSwap}>
                            <Ionicons name="add-circle-outline" size={20} color="#fff" />
                            <Text style={styles.joinButtonText}>Join Swap</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Article Modal */}
            {renderArticleModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#fff',
    },
    backBtn: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    shareBtn: {
        padding: 8,
    },
    swapImage: {
        width: '100%',
        height: 250,
    },
    badgeContainer: {
        position: 'absolute',
        top: 200,
        right: 20,
    },
    badge: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    swapTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    teacherSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    teacherInfo: {
        flex: 1,
        marginLeft: 15,
    },
    teacherName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#666',
        marginLeft: 5,
    },
    reviews: {
        fontSize: 14,
        color: '#666',
        marginLeft: 5,
    },
    followButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    followButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    exchangeSection: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    exchangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    skillBox: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    skillLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
    },
    skillName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    swapIcon: {
        marginHorizontal: 15,
    },
    descriptionSection: {
        marginBottom: 25,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
    },
    articlesSection: {
        marginBottom: 30,
    },
    articleCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    articleImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    articleContent: {
        flex: 1,
        padding: 15,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    articleExcerpt: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 8,
    },
    articleReadTime: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 15,
    },
    contactButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#2196F3',
        paddingVertical: 15,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    joinButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Modal Styles
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        width: width * 0.9,
        maxHeight: '80%',
        borderRadius: 15,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 15,
    },
    closeButton: {
        padding: 5,
    },
    modalBody: {
        flex: 1,
    },
    modalImage: {
        width: '100%',
        height: 200,
    },
    modalMeta: {
        padding: 20,
        paddingBottom: 10,
    },
    readTime: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
    articleContent: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});