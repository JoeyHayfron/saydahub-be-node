PGDMP         )                 |            saydahub    15.3    15.3     +           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ,           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            -           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            .           1262    16394    saydahub    DATABASE     j   CREATE DATABASE saydahub WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE saydahub;
                postgres    false            (          0    16614    Books 
   TABLE DATA           �   COPY public."Books" (id, title, year, pages, edition, "ISBN", overview, price, currency, language, categories, publisher, cover_image, main_book, sample_book) FROM stdin;
    public          postgres    false    222   �       &          0    16604 
   Categories 
   TABLE DATA           f   COPY public."Categories" (id, name, color, description, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �       $          0    16595 
   Publishers 
   TABLE DATA           f   COPY public."Publishers" (id, name, logo, description, country, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218                     0    16417    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    214   {       "          0    16558    Users 
   TABLE DATA             COPY public."Users" (id, name, email, phone, provider, password, cover_photo, banner, user_type, bio, website, number_of_followers, number_of_following, number_of_scoops, number_of_books, is_followed_by_me, "createdAt", "updatedAt", author_status) FROM stdin;
    public          postgres    false    216   +       /           0    0    Books_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Books_id_seq"', 1, false);
          public          postgres    false    221            0           0    0    Categories_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Categories_id_seq"', 1, false);
          public          postgres    false    219            1           0    0    Publishers_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Publishers_id_seq"', 1, true);
          public          postgres    false    217            2           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);
          public          postgres    false    215            (      x������ � �      &      x������ � �      $   \   x�3�I-.Q(M��,�H-R0���t�,
���姤r�g$�%r���*�Z[����i�I��Y�ꙛX��b���� Uv�          �   x�e��� E��f@��41>&j}�]��i)�]0!9'� ��Ex ([G�N��䲇�h�Dz\)��.�u�V'��hN�2��Q�Ǒ��+%�a_�)��<��Zy+�D��g��1J���Հ�Z��e�]���J?�L;�_)?gtE,5��I���dX      "      x��\MS9�>k~��m�W�Rq�3|�,�fg��݂����������T��B���-b8��:�ғO>��9�a�]x$��������������5�ZW�0N��G~��r������]3<��^��}�G��mV�N�����埋��??|���S�����!���?~3,c�����L�}&�����@��h%��`����Þxh��E���Ѕ���"�M�/���.�݅.�HN��gr��=��:��r����9�����%)c�uH�\l��������O�u���_ƘbQ��l��?E�����Ձ��u-wϑ@�?$?`�J�_G���GH�0-�U�΃��s6uV�܃o�@V4���g���� �")������@O|��=��tuhf7���m�A�7H��pG =N�����c�@A�8\�ɒ��c�6�#��/EE�c7�'��6;q��Pq���7���.�HX�9J0I�*Λ��k?��/k��#ձ���̹����M5���>bn�[̜6�2��8��Chgg�G�F��v�!U����Uop�b2,��ɟ1U�̙t�����qF.|7M�z
Y��}3�n�26M=_��η�zv�m[˲�q6i�� B,� ��*O��{,U%8�ָ"LW)>�����=9��<��f����ԙS��!X(�J	?��t�����2*�(B��  ��=�߇�^�>IL�#�8��I!�Sa�( ��A��g��%���}|ZIK��
Vf�ǧ%� �#Z w�Bg��������
��|�q]���f��sדS�m��<�i�TVN�2�H�K�0 ����ty�t� �@�6�P��a
!�Ku�yF�R�$G:���'[�c ��e�{�A�qkL~u&'�x �y�fm��Ax��@Z��Ē3ȋ_ή��sr=��	z�j������8
~4|yQ� A�G�4ET���n���G����	O?�fю�	>-�@njӑ�Zeor@h���ҕ�����r�}{1��S�v�4EJP!x�m���Q"�$���8d�4���텁C�[$�$	/p�v͜�\fp-ݘ�b�[���	N�����v��u7;��x�'hZ��Ib�
gJ3j�QV��	�b��2Knq�50�|߶������} }�fx�9�8�
S�7�J���C$���]�8�P����6a��Ǻ���5�����g�VL�=h�r����$W��il� /LU��B��~9l[za�C�V���
�DO?��S?_#G /&�,I.q$MM�!s�(�"A��+0^hr���a�~vM�}%�	R�@/:����KLN/����!DZ9��
�3ˡ_,��!��������~{U�	�f��<Ca����Vei1[ �l���B!��D���������Q�=&���,1�<,�` /�e�8�*Br��cZf�K���k��[��8�mh�;&f<��
�VJ9�Y6�*H��/��"�������{�}(��6�\L�S�
�G����U#i	�NI�n��,y��}���uh��ʑ�zZ�reyZU����t+�� U	��^�S���]x�c��n�<��5��m�m��Y�����0(ʨ�i�:T��!����\Jv 5��LT�ބ�^�����`*r��r�u��i�@�H]�B�������{0��,�$�wz��w+���u��#@�o�Q0��Q�eV䐎`�DQV��`?��vv�Y��jX��w��qM<��q�Z�!��䥗�R(+[�cR�����٧�yrQϗ@�q㪗b���B%f��A)t�2�R:+@w�ʔ�_�M�e񱞏c��X`E���ا���B�OH��"T�JZr�ýo�e������&�CxX�V�J������I7HW#L%G�D�(�r�z	E2���Kz��s�x��0G��& ƌzIn��鰐1WS�Բf�y��b�5����0���]�n����4�P���Y���Nc,��B���b4"퓧_���p�I��ī�IF�, �]5���@�'�T��Xq���7�Yl�-w�s�p�f7��z|����3�<�u�3#J���4�iΔIC}���A�S���t�f7LM,e�$�a!���\��^A�"�j9^�A%�!N@l5���Ύ|����rvȂ��CUҮ�̷Z�I)�yۅ��W�0_�(ԙ�N�����na�8��YF�ZG��O��뒪����u4�/D�ể����(�`�� >S��2@��Y��+2����V���b4�!1)�@�� �: u�S���Aֲ��,���8mӫ�ٴ�m��}0b蹠0[*LA��>�ƒ�v�m�z��MK1v0�fp�`2��O�,�X��Nʲ�~����y��|r(�|N<6P�V9��(�k����\�?X UWP�ױ]�nbs�󁉚�_�t�B��J�*�LH�-K4~TĤ$
���<����QP�O|������ӛ+$�/R&'�82��,M��(tN���o�mg�0�_~�oTn-�\�H�$⥲z|؎,��YV��LZ���p��.���Cܢqn��)��n����@�5�T����㠈jU ���<��U��{�G���5�sc��bJ�1_;�ϴN���l2P�-�B#���mk�l��6A䀮'�6yd5�z3�١��%!Q�:W�%�"�9 x3;�����m櫮^��9a�7m�Ԕq=�Xqh���2�Na��)m�ڐO�#�M�#&�&�W�����x.g��'}$J'�F�F�wcǊ�?��ګ*O��rE�CH8�-���,�c@	hx	��^|X��٦}
P���o��yx@3�%&�/t�rz$-fdX`i�,������
%����]��1M�B�=�pUn1ӓ�7����#O����B�R:Eq#�����Ƈګ��o9���M=;�����fbZ��o��T�� ��Io���QZ�Ѡ����*���3.�;=�BL���fr�f*Y���vjG�I$+���R4���v��E�m�_�M�����".����\�C��xf"S������\>C>4�R���bۄ�^��a��a�׫$�rK��y�K fr��չ��J�o����������,9���M���D39�q��b��di�7RXj�m��鏏�㷳���y���. ��(i&2\Z�IN ��.s� ʤY8�/BC�RAC�k��y�a�����b^��VML@DZJr�h���^�(	8Z�-�����s�<�� �1�h�/k<��#891�yaS&^F�?f*���JUb�#�e�PϗV 5	M�<����	H�I�-͸��YY" �v�U9�2t)�P����6tЋ�ZL~�&�;���%�4��]Zϒx�D9�@?<�^���5(~h��Ȝk'�c�͗D�e��L�-�8������Y=2Du�l{�J��o� Uiu�����H�<��q'�Ds�7��;�f��C �h��lx��ƹ��U	��"�`"]�h�����b		+S�������e�e�G]X�p�:
jr^aS�r(
2��(qi���\մ@+���N�nX�#o�r�-�"�]�/���'���*iTj��P�"��H��kH��]�E8v���rbk�`���Vr�@2ҝXZ+�;_��YU��k�ȧh��~^��:�GoJ^�n�nh�������6[�Ϋ����w��?��M�8E4|��aط�x�TX��Hv�K��IS�@&���=}&��Q6X����w;��6_��ޖ�8����k�4����VH��7��{=<���w��|þ�R*ZW5Z1�q�r��%A��Z*Q�A��?C��ak�u�K�K�nz��}��=M��^�<ปQ'�!��3��z��p�ܛ��&�-d�,V[DqS��|'|Bn����HN�h�;�>d�>�T����&�����A����J`7�L�R#�C'ɇ�o{�U���t\.4�?�����LB=��v/%p-�*�[sT��a��%O6(�ћ�|�3�����C�}�� �  1nz�"�q�BS���T�x^,U�<��\c�{=��@n|��������q���8
M����;C��bz�9V�
�K�w��?߄a�����;�dng?�S�Դ3�+G])�;�|��?*�E'���c9>���w��-,�.������	�i�%�1�s�8mF��]����3���7c��C��V��r�_�3\cB��K1ET��z�
���a;����jt�&'6�f�$�I*�����<�+�b��P�l�=����x�����b��d�$�w�)w6�8ݳi'�V��Z'�P��p���xO>��`�h����\�82�� �I9j�~��a�/)�r���+�C������![�Y�M��ʞ�.��q�I���LQ,CZ�L����d�y�/K[@� �f81N��8$��Q�p�]<o?��CS�],({F��x�7� W��=q�I�P���!��Ա@�x)� ^8 ��ݭ���/�<Bi�5-�������w��ؾ%=d�華oU���O� �-��^x8�]��7^�����ɜ�-��h2�y*[
_�)7�*|�	[z���V�,����ʹ�a�����.��*d��<��)T����T��nV�d1tk��x��*���j��2L2W4e�~5�-��׶𥌒vT9��޴���B���.tc�z�Ji.�C�r���[�s���=�s��)4���$�P���G�&0�'#5>��^�
�(�k,�^k[>���{F�t�	��M�ϗ|��{��UTQ2C�ɱ��6�
�}Q�8��&vu�oӎ�A[5���M�7w��&�b��b�P	5��I�B�n�¦�<��Ӻ��.|��]Z��Wq1z��k.�q8��ߟ���~�����g7*��:�������y�ǿί�^�^��\��Ƿ�o�7C|����n�;="��6s�kT6v����{�] ������_~�oh�xf     